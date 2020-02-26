import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {

    const addAnecdote = async (event) => {

        event.preventDefault()
        const content = event.target.anec.value
        event.target.anec.value = ''

        props.createAnecdote(content)

        props.setNotification(`you added '${content}'`, 3)
    }

    return (
        <form onSubmit={addAnecdote}>
            <input name='anec' />
            <button type='submit'>add</button>
        </form>
    )
}

const mapDispatchToProps = {
    createAnecdote,
    setNotification
}


export default connect(
    null, 
    mapDispatchToProps
)(AnecdoteForm)