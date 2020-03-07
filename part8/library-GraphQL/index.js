const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://library-graphql:library-graphql@library-graphql-cluster-mt3de.mongodb.net/libraryApp?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDb')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })


const typeDefs = gql`

    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }

    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }


    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(authorName: String, genre: String): [Book!]!
        allAuthors: [Author!]!

        me: User
    }

    type Mutation {
        addBook(
            title: String!
            authorName: String!
            published: Int!
            genres: [String]!
        ): Book

        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author

        createUser(
            username: String!
            favoriteGenre: String!
        ): User

        login(
            username: String!
            password: String!
        ): Token
    }
`

const jwt = require('jsonwebtoken')
const JWT_SECRET = 'SECRET_KEY'

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: (root, args) => {
            return Book.find({}).populate('author')
        },
        allAuthors: () => Author.find({}),
        
        me: (root, args, context) => {
            return context.currentUser
        }
    },

    Author: {
        bookCount: async (root) => {
            let count = 0
            const bookList = await Book.find({}).populate('author')

            bookList.map(b => {
                if (b.author.name === root.name) {
                    count++
                }
            })

            return count
        }
    },

    Mutation: {
        addBook: async (root, args, context) => {

            const currentUser = context.currentUser
            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }

            if (!args.title || !args.authorName || !args.published) {
                throw new UserInputError(`Field can not be empty`, {
                    invalidArgs: args.name
                })
            }

            let author = await Author.findOne({ name: args.authorName })

            try {
                if (!author) {
                    author = new Author({
                        name: args.authorName
                    })

                    await author.save()
                }

                const newBook = new Book({
                    title: args.title,
                    author: author,
                    published: args.published,
                    genres: args.genres
                })

                await newBook.save()
                return newBook

            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }
        },

        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }

            const author = await Author.findOne({ name: args.name })

            if (!author) return null

            author.born = args.setBornTo

            try {
                await author.save()

            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }

            return author
        },

        createUser: (root, args) => {
            const user = new UserInputError({ username: args.username })
            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message), {
                        invalidArgs: args
                    }
                })
        },

        login: async (root, args) => {
            const user = await UserInputError.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new UserInputError('wrong credentials')
            }

            const userForToken = {
                username: user.username,
                id: user._id
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null

        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )

            const currentUser = await UserInputError.findById(decodedToken.id).populate('favoriteGenre')
            return { currentUser }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})