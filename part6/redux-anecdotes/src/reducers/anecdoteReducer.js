
const Reducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action.type)

  switch (action.type) {

    case 'INIT_ANECDOTES':
      return action.data

    case 'VOTE':
      const id = action.data.id
      const anecdote = state.find(a => a.id === id)
      const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
      return state.map(a => a.id !== id ? a : changedAnecdote)

    case 'NEW_ANEC':
      return state.concat(action.newAnec)

    default:
      return state
  }

}

export const initializeAnecdotes = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}

export const voteHandler = (id) => {

  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (newAnec) => {
  return {
    type: 'NEW_ANEC',
    newAnec
  }
}

export default Reducer