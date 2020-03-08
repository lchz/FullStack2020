const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

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
        bookCount: Int!
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

    type Subscription {
        bookAdded: Book!
    }
`

const jwt = require('jsonwebtoken')
const JWT_SECRET = 'SECRET_KEY'

const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: (root, args) => {
            if (args.genre) {
                // return Book.find({ genres: { "$in": [args.genre] } })
                return Book.find({ 'genres': args.genre }).populate('author')
            }

            return Book.find({}).populate('author')
        },
        allAuthors: () => Author.find({}).populate('bookCount'),

        me: (root, args, context) => {
            return context.currentUser
        },
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
            let newBook = null
            try {
                if (!author) {
                    author = new Author({
                        name: args.authorName,
                        bookCount: 1
                    })

                } else {
                    author.bookCount = author.bookCount + 1
                }
                
                await author.save()

                newBook = new Book({
                    title: args.title,
                    author: author,
                    published: args.published,
                    genres: args.genres
                })

                await newBook.save()

            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }

            pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
            return newBook
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
            const user = new User({ username: args.username })
            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message), {
                        invalidArgs: args
                    }
                })
        },

        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new UserInputError('wrong credentials')
            }

            const userForToken = {
                username: user.username,
                id: user._id
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        }
    },

    Subscription: {
        bookAdded: {
            subscibe: () => pubsub.asyncIterator(['BOOK_ADDED'])
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

            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})