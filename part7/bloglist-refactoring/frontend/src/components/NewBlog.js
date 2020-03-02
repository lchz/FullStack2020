import React from 'react'
import { createBlog } from '../reducers/blogReducer'
import BlogForm from './BlogForm'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'



const NewBlog = () => {
    
    const dispatch = useDispatch()
    const blogFormRef = React.createRef()

    const addBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility()
        try {
            dispatch(createBlog(blogObject))
            const notification = {
                message: `A new blog ${blogObject.title} by ${blogObject.author} added`,
                type: 'success'
            }
            dispatch((setNotification(notification, 5)))

        } catch (exception) {
            const notification = {
                message: 'New blog failed to add',
                type: 'error'
            }
            dispatch((setNotification(notification, 5)))
        }

    }

    const newBlogForm = () => (
        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
        </Togglable>
    )

    return (
        <div>
            {newBlogForm()}
        </div>
    )
}


export default NewBlog
