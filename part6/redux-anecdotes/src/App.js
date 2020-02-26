import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import anecdotesService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    anecdotesService.getAll().then(
      anecdotes => dispatch(initializeAnecdotes(anecdotes))
    )
  }, [dispatch])

  return (
    <div>

      <h2>Anecdotes</h2>
      <Notification />
      <Filter />

      <h2>create new</h2>
      <AnecdoteForm />

    </div>
  )
}

export default App