import React, { useEffect } from 'react'
import '../index.css'
import { useDispatch, useSelector } from 'react-redux'
import { toUpdateBlog, removeBlog, initializeBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'
import NewBlog from './NewBlog'
import Blog from './Blog'


const BlogList = () => {

    const sortBlogs = (b1, b2) => {
        return (b2.likes - b1.likes)
    }

    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs.sort(sortBlogs))
    const user = useSelector(state => state.user)

    const match = useRouteMatch('/blogs/:id')
    const blog = match ? blogs.find(b => b.id === match.params.id) : null


    const sameUser = (blog) => {
        if (blog) {
            return user.username === blog.user.username
        }

    }


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
                    type: 'danger'
                }
                dispatch((setNotification(notification, 5)))
            }
        }

    }


    return (
        <div>
            <Switch>
                <Route path='/blogs/:id'>
                    <Blog blog={blog}
                        sameUser={sameUser(blog)}
                        updateLikes={() => updateLikes(blog)}
                        deleteBlog={() => deleteBlog(blog)}
                    />
                </Route>

                <Route path='/'>
                    <NewBlog /> <br></br>
                    
                    <h3>blogs</h3>
                    {blogs.map(blog =>
                        <div className='blog' key={blog.id}>
                            <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
                        </div>
                    )}
                </Route>
            </Switch>

        </div>
    )

}

export default BlogList