import anecdotesServer from '../services/anecdotes'


const Reducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action.type)

  switch (action.type) {

    case 'INIT_ANECDOTES':
      return action.data

    case 'VOTE':
      return action.data

    case 'NEW_ANEC':
      return state.concat(action.data)

    default:
      return state
  }

}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesServer.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const voteHandler = (anec) => {
  return async dispatch => {
    
    await anecdotesServer.newVote(anec)
    const anecdotes = await anecdotesServer.getAll()

    dispatch({
      type: 'VOTE',
      data: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnec = await anecdotesServer.createNew(content)
    dispatch({
      type: 'NEW_ANEC',
      data: newAnec
    })
  }
}

export default Reducer