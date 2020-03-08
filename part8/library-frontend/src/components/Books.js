import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'


const Books = (props) => {
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState(null)

  const { loading, data, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre }
  })

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks)
    }

  }, [data, genre])

  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const showAll = (event) => {
    event.preventDefault()
    setGenre(null)
    refetch()
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>
              in genre patterns
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        <form onSubmit={showAll}>

          {props.genres.length > 0 ? props.genres.map(genre =>
            <button key={genre} onClick={() => setGenre(genre)}>{genre} </button>
          ) : null}

          <button type='submit'>all</button>

        </form>
      </div>
    </div>
  )
}

export default Books