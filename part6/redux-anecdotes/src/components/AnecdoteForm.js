import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {

        event.preventDefault()
        const content = event.target.anec.value
        event.target.anec.value = ''

        dispatch(createAnecdote(content))

        dispatch(setNotification(`you added '${content}'`, 3))
    }

    return (
        <form onSubmit={addAnecdote}>
            <input name='anec' />
            <button type='submit'>add</button>
        </form>
    )
}


export default AnecdoteForm