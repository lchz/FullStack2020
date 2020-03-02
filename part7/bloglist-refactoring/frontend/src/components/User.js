import React from 'react'

const User = ({user}) => {
    if (!user) return null

    return (
        <div>
            <h3>{user.name}</h3>
            <strong>added blogs</strong>

            <ul>
                {user.blogs.map(b => <li key={b.id}>{b.title} </li>)}
            </ul>
            
        </div>
    )
}


export default User