import React, { useState } from 'react'


const Blog = ({ blog, updateLikes, deleteBlog, sameUser }) => {
  const [visibility, setVisibility] = useState(false)
  const [label, setLabel] = useState('view')

  const viewButtonHandler = () => {
    if (!visibility) {
      setLabel('hide')
    } else {
      setLabel('view')
    }

    setVisibility(!visibility)
  }

  // const removeButton = sameUser === true
  // ?<button onClick={deleteBlog}>remove</button>
  //        : null


  return (
    <div className='blog'>
      <div>
        {blog.title} - {blog.author}
        <button onClick={() => viewButtonHandler()}>{label}</button>
      </div>

      {visibility && (
        <div>
          <div>
            {blog.url}
          </div>

          <div>
            likes: {blog.likes}
            <button onClick={updateLikes}>like</button>
          </div>

          <div>
            {blog.user.name}
          </div>

          {sameUser && <button onClick={deleteBlog}>remove</button>}

        </div>
      )}

    </div>
  )

}

export default Blog
