import { gql } from '@apollo/client'


const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    author {name}
    published
    genres
  }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`

export const ALL_AUTHORS = gql`
    query getAuthors {
        allAuthors {
            name
            born
            bookCount
            id
        }
    }
`

export const ALL_BOOKS = gql`
    query getBooks($genre: String) {
        allBooks(genre: $genre) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`

export const ME = gql`
    query me {
        me {
            username
            favoriteGenre
        }
    }
`

export const ADD_BOOK = gql`
    mutation createBook($title: String!, $authorName: String!, $published: Int!, $genres: [String]!) {
        addBook (
            title: $title,
            authorName: $authorName,
            published: $published,
            genres: $genres
        ) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`

export const EDIT_BORN = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!) {
        editAuthor (
            name: $name,
            setBornTo: $setBornTo
        ) {
            name
            born
            bookCount
            id
        }
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`

