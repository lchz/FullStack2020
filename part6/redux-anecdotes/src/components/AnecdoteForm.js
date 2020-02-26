import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notifNoteChange, notifReset } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotes'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {

        event.preventDefault()
        const content = event.target.anec.value
        event.target.anec.value = ''

        const newAnec = await anecdotesService.createNew(content)
        dispatch(createAnecdote(newAnec))

        dispatch(notifNoteChange(content))
        setTimeout(() => {
            dispatch(notifReset())
        }, 3000)
    }

    return (
        <form onSubmit={addAnecdote}>
            <input name='anec' />
            <button type='submit'>add</button>
        </form>
    )
}


export default AnecdoteForm