import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, getComments } from '../reducers/commentReducer'
import { Form, Button } from 'semantic-ui-react'


const Blog = ({ blog, updateLikes, deleteBlog, sameUser }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    if (blog) {
      dispatch(getComments(blog.id))
    }

  }, [blog, dispatch])

  const comments = useSelector(state => state.comments)

  const commentHandler = (event, id) => {
    event.preventDefault()

    const content = event.target.comment.value
    event.target.comment.value = ''

    dispatch(addComment(content, id))
  }

  const likes = () => { return (blog.likes) }

  if (!blog) return null

  return (
    <div>
      <h2>
        {blog.title} - {blog.author}
      </h2>

      <div>
        {blog.url}
      </div>

      <div>
        added by {blog.user.name}
      </div>

      <div>
        <Button basic
          color='violet'
          content='Like'
          icon='heart'
          label={{ basic: true, color: 'violet', pointing: 'left', content: likes() }}
          onClick={updateLikes}
        />
      </div> <br></br>

      <div>
        {sameUser && <Button color='red' onClick={deleteBlog}>remove</Button>}
      </div><br></br>

      <div>
        <strong>comments</strong>

        <Form onSubmit={(event) => commentHandler(event, blog.id)}>

          <Form.Field>
            <input
              type="text"
              id='content'
              name="comment"
            />
          </Form.Field>

          <Button primary type='submit'>add comment</Button>
          
        </Form><br></br>

        <div className='container'>
            {comments.map(c => <li key={c._id}>{c.content} </li>)}
        </div>
      </div>

    </div>

  )

}

export default Blog
