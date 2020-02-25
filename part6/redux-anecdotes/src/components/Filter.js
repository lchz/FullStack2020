import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'
import AnecdoteList from './AnecdoteList'

const Filter = () => {

    const style = {
        marginBottom: 10
    }

    const dispatch = useDispatch()

    const handleChange = (event) => {

        event.preventDefault()
        const find = event.target.value
        dispatch(filterChange(find))

    }

    const result = useSelector(({anecdotes, filter}) => {
        return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    })


    return (
        <div style={style}>
            filter <input onChange={handleChange}/>
            <AnecdoteList anecdotes={result} />
        </div>
    )
}

export default Filter