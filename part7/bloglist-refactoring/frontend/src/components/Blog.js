import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, getComments } from '../reducers/commentReducer'


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
        likes: {blog.likes}
        <button onClick={updateLikes}>like</button>
      </div>

      <div>
        added by {blog.user.name}
      </div>

      <div>
        {sameUser && <button onClick={deleteBlog}>remove</button>}
      </div><br></br>
      
      <div>
        <strong>comments</strong>

        <form onSubmit={(event) => commentHandler(event, blog.id)}>
          <input type='text' name='comment'/>
          <button type='submit'>add comment</button>
        </form>

        <ul>
          {comments.map(c => <li key={c._id}>{c.content} </li>)}
        </ul>
      </div>

    </div>

  )

}

export default Blog
