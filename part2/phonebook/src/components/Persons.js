import React from 'react'

const Persons = ({ results, persons, search, deletingHandler }) => {

    const rows = () => persons.map(p => <p key={p.name}>{p.name} {p.number} <button onClick={() => deletingHandler(p.id)}>delete</button> </p>)
    const filterRows = () => results.map(r => <p key={r.name}>{r.name} {r.number} <button onClick={() => deletingHandler(r.id)}>delete</button> </p>)


    if (results.length === 0 && search.length === 0) {
        return (<div>{rows()} </div>)
    } else if (results.length === 0 && search.length !== 0) {
        return (<div>No such person</div>)
    }
    return (<div>{filterRows()} </div>)
}

export default Persons