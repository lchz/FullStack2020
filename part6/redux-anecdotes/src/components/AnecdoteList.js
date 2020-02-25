import React from 'react'
import { useDispatch } from 'react-redux'
import { voteHandler } from '../reducers/anecdoteReducer'
import {  notifReset, notifVoteChange } from '../reducers/notificationReducer'


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
    // const anecdotes = useSelector(state => state.anecdotes.sort(compareVotes))
    const anecdotes = a.anecdotes.sort(compareVotes)

    const buttonHandler = (anec) => {
        dispatch(voteHandler(anec.id))
        dispatch(notifVoteChange(anec.content))
        setTimeout(() => {
            dispatch(notifReset())
        }, 3000)
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