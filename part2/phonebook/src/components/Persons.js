import React from 'react'

const Persons = ({ results, persons, search }) => {

    const rows = () => persons.map(p => <p key={p.name}>{p.name} {p.number} </p>)
    const filterRows = () => results.map(r => <p key={r.name}>{r.name} {r.number} </p>)


    if (results.length === 0 && search.length === 0) {
        return (<div>{rows()} </div>)
    } else if (results.length === 0 && search.length !== 0) {
        return (<div>No such person</div>)
    }
    return (<div>{filterRows()} </div>)
}

export default Persons