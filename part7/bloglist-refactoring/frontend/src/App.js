import React, { useState, useEffect } from 'react'
import './index.css'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(initializeBlogs())
  // }, [dispatch])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])



  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUser(user))
      // setUser(user)
      setUsername('')
      setPassword('')

      const notification = {
        message: `Welcome back ${user.name}`,
        type: 'success'
      }
      dispatch((setNotification(notification, 5)))

    } catch (exception) {
      const notification = {
        message: 'Wrong username or password',
        type: 'error'
      }
      dispatch((setNotification(notification, 5)))
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='Log in'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )


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


  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">Logout</button>
    </form>
  )

  const user = useSelector(state => state.user)

  return (
    <div>
      {user === null ? loginForm()
        :
        <div>
          <h2>blogs</h2>

          <Notification />

          <div>{user.name} logged in {logoutForm()}</div>
          <br></br>

          {newBlogForm()} <br></br>

          <BlogList />


        </div>
      }
    </div>
  )
}

export default App