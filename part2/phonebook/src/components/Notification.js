import React from 'react'

const Notification = ({message}) => {
    if (message === null || message === '') {
      return null
    }

    /** Validation msg */
    if (message.search('Added') === -1 && message.search('Deleted') === -1 && message.search('Replaced') === -1) {
      const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
      }

      return (
        <div style={errorStyle}>
          {message}
        </div>
      )
    } 

    const successStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
    }

    return (
      <div style={successStyle}>
        {message}
      </div>
    )
  }

  export default Notification