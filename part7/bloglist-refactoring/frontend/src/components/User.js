import React from 'react'

const User = ({ user }) => {
    if (!user) return null

    return (
        <div>
            <h2>{user.name}</h2>
            
            <div className='container'>
                <h5>added blogs</h5>
                <ul>
                    {user.blogs.map(b => <li key={b.id}>{b.title} </li>)}
                </ul>
            </div>

        </div>
    )
}


export default User