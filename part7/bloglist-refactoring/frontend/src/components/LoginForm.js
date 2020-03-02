import React from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import { Button } from 'semantic-ui-react'

const LoginForm = ({ handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password }) => {

  return (
    <div>
      <h2>Log in to application</h2>

      <Notification />

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            id='username'
            name="Username"
            onChange={handleUsernameChange}
          />

          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            id='password'
            name="Password"
            onChange={handlePasswordChange}
          /> <br></br>

          <Button primary type='submit' id='login-button'>
            Login
          </Button>

        </Form.Group>

      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm