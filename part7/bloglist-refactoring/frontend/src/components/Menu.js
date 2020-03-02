import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'


const Menu = ({ user }) => {

    const dispatch = useDispatch()

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        dispatch(setUser(null))
    }

    return (
        <div className='menu'>
            <Link className='link' to='/users'>users</Link>
            <Link className='link' to='/'>blogs</Link>
            {user.name} logged in <button onClick={() => handleLogout()}>Logout</button>
        </div>
    )
}


export default Menu