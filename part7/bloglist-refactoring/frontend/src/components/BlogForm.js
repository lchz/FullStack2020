import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'semantic-ui-react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>

      <Form onSubmit={addBlog}>
        <Form.Field>
          <label>title</label>
          <input
            type="text"
            value={title}
            id='title'
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>author</label>
          <input
            type="text"
            value={author}
            id='author'
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>url</label>
          <input
            type="text"
            value={url}
            id='url'
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Field>

        <Button primary type='submit'>create</Button>
        
      </Form><br></br>

    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}


export default BlogForm