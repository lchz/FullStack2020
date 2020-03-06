import React from 'react'


const Notification = ({ message }) => {
    if (!message) return null

    return (
        <div style={{ color: `${message.type}` }}>
            {message.content}
        </div>
    )
}


export default Notification