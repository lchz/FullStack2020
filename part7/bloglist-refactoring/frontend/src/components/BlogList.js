import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toUpdateBlog, removeBlog, initializeBlogs } from '../reducers/blogReducer'
import Blog from './Blog'
import { setNotification } from '../reducers/notificationReducer'


const sortBlogs = (b1, b2) => {
    return (b2.likes - b1.likes)
}

const BlogList = () => {

    const dispatch = useDispatch()
    let blogs = useSelector(state => state.blogs.sort(sortBlogs))
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(initializeBlogs())
      }, [dispatch])

    const updateLikes = async (blog) => {
        dispatch(toUpdateBlog(blog))
    }

    const deleteBlog = async (blog) => {

        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {

            try {

                dispatch(removeBlog(blog))
                
                const notification = {
                    message: `Successfully removed ${blog.title} by ${blog.author}`,
                    type: 'success'
                }
                dispatch((setNotification(notification, 5)))
                

            } catch (exception) {

                const notification = {
                    message: `Failed to delete ${blog.title} by ${blog.title}`,
                    type: 'error'
                }
                dispatch((setNotification(notification, 5)))
            }

            

        }

    }
    
    const sameUser = (blog) => {
        return user.username === blog.user.username
    }

    return (
        <div>
            {blogs.map(blog =>
                <Blog key={blog.id}
                    blog={blog}
                    sameUser={sameUser(blog)}
                    updateLikes={() => updateLikes(blog)}
                    deleteBlog={() => deleteBlog(blog)}
                />
            )}
        </div>
    )

}

export default BlogList