import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteHandler } from '../reducers/anecdoteReducer'

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


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.sort(compareVotes))

    return (
        <div>
            {anecdotes.map(anec =>

                <Anecdote key={anec.id}
                    anec={anec}
                    voteHandler={() => dispatch(voteHandler(anec.id))}
                />
            )}

        </div>

    )
}


export default AnecdoteList