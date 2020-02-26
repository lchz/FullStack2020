import React from 'react'
import { connect } from 'react-redux'


const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }


  return (
    <div>
      {props.notification &&
        <div style={style}>
          {props.notification}
        </div>}
    </div>
  )
}


const mapStateToProps = (state) => {
  if (state.notification) {
    return {
      notification: state.notification
    }
  } 
  return {notification: null}
}

export default connect(
  mapStateToProps,
  null
)(Notification)