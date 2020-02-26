import React from 'react'
import { useDispatch } from 'react-redux'
import { voteHandler } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const compareVotes = (a, b) => b.votes - a.votes

const Anecdote = ({ anec, voteHandler }) => {

    return (
        <div>
            <div>
                {anec.content}
            </div>
            <div>
                has {anec.votes}
                <button onClick={voteHandler}>vote</button>
            </div>

        </div>
    )
}

const AnecdoteList = (a) => {
    const dispatch = useDispatch()
    const anecdotes = a.anecdotes.sort(compareVotes)

    const buttonHandler = (anec) => {
        dispatch(voteHandler(anec))
        dispatch(setNotification( `you voted '${anec.content}'`, 5))
    }

    return (
        <div>
            {anecdotes.map(anec =>

                <Anecdote key={anec.id}
                    anec={anec}
                    voteHandler={() => buttonHandler(anec)}
                />
            )}

        </div>

    )
}


export default AnecdoteList