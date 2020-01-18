import React from 'react'

const Filter = ({search, handleFilter}) => {
    return (
        <input value={search} onChange={handleFilter} />
    )
}

export default Filter