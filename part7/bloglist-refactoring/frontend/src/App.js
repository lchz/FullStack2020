import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import { Switch, Route, useHistory } from 'react-router-dom'
import UsersStats from './components/UsersStats'
import Menu from './components/Menu'



const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()

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

      const notification = {
        message: `Welcome back ${user.name}`,
        type: 'success'
      }
      dispatch((setNotification(notification, 5)))

      history.push('/')

    } catch (exception) {
      const notification = {
        message: 'Wrong username or password',
        type: 'danger'
      }
      dispatch((setNotification(notification, 5)))
    }

    setUsername('')
    setPassword('')
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  const user = useSelector(state => state.user)


  return (

    <div className='container'>
      {user === null ? loginForm()
        :
        <div>
          <Menu user={user} />
          <h2>blog app</h2>

          <Notification />

          <Switch>

            <Route path='/users'>
              <UsersStats />
            </Route>


            <Route path='/'>
              <BlogList />
            </Route>

          </Switch>
        </div>
      }

    </div>
  )
}

export default App