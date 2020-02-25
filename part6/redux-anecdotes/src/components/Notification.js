import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notification = useSelector(({ notification }) => {
    if (notification) {
      return notification
    }

    return null
  })
  // const notification = null
  // useSelector(({anedocates, notification}) => {
  //   if ()
  // })
  // console.log('notif:', notification)
  // console.log('state:', useSelector(state => state))

  return (
    <div>
      {notification &&
        <div style={style}>
          {notification}
        </div>}
    </div>
  )
}

export default Notification