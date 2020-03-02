import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import {  Button } from 'react-bootstrap'
import { Menu } from 'semantic-ui-react'


const MenuBar = () => {

    const dispatch = useDispatch()

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        dispatch(setUser(null))
    }

    return (

        <Menu inverted>
            <Menu.Item link>
                <Link to="/">blogs</Link>
            </Menu.Item>
    
            <Menu.Item link>
                <Link to="/users">users</Link>
            </Menu.Item>

            <Menu.Item link>
                <Button variant='primary' type='submit' onClick={() => handleLogout()}>
                    Logout
                </Button>
            </Menu.Item>
        </Menu>
    )
}


export default MenuBar