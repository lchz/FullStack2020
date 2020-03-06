import { gql } from '@apollo/client'

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
    query getBooks {
        allBooks {
            title
            published
            author
            id
            genres
        }
    }
`

export const ADD_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
        addBook (
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ) {
            title
            author
            published
            genres
        }
    }
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