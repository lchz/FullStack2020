import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'


const NewBook = (props) => {

  const [title, setTitle] = useState('')
  const [authorName, setAuhtorName] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(
    ADD_BOOK,
    {
      refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
      // onError: (error) => {
      //   props.setMessage({ type: 'red', content: error.graphQLErrors[0].message })
      // }
    }
  )

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    try {
      await createBook({ variables: { title, authorName, published: Number(published), genres } })

      props.setMessage({ type: 'green', content: `book ${title} created` })
      
    } catch (error) {
      props.setMessage({type: 'red', content: error.graphQLErrors[0].message})
    }
    

    setTitle('')
    setPublished('')
    setAuhtorName('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={authorName}
            onChange={({ target }) => setAuhtorName(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook