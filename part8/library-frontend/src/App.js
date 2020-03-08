import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'
import Recommendation from './components/Recommendation'


const App = () => {
  const [page, setPage] = useState('authors')
  const [message, setMessage] = useState(null)
  const [genres, setGenres] = useState([])

  const client = useApolloClient()
  const result = useQuery(ALL_BOOKS)

  const [token, setToken] = useState(null)


  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })


  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }

    if (result.data) {
      const books = result.data.allBooks

      books.forEach(b => {
        b.genres.forEach(g => {
          if (!genres.includes(g)) {
            setGenres(genres.concat(g))
          }
        })
      })

    }
  }, [result.data, genres])

  const notify = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000);
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const buttontoShow = () => {
    if (token) {
      return (
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommendation')}>recommend</button>
          <button onClick={logout}>logout</button>
        </div>
      )
    } else {
      return (
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
      )
    }
  }


  return (
    <div>
      {buttontoShow()}

      <Notification message={message} />

      <Authors
        show={page === 'authors'}
        setMessage={notify}
        token={token}
      />

      <Books
        show={page === 'books'}
        genres={genres.sort()}
      />


      <NewBook
        show={page === 'add'}
        setMessage={notify}
      />

      <LoginForm
        show={page === 'login'}
        setMessage={notify}
        setToken={setToken}
        setPage={setPage}
      />

      <Recommendation
        show={page === 'recommendation'}
        token={token}
      />

    </div>
  )
}

export default App