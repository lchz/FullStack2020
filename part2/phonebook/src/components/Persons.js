import React from 'react'

const Persons = ({ results }) => {
    const filterRows = () => results.map(r => <p key={r.name}>{r.name} {r.number} </p>)
    return (
        <div>{filterRows()} </div>
    )
}

export default Persons