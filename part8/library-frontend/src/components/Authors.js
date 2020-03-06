import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import BirthdayForm from './BirthdayForm'


const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  
  if (result.loading) {
    return <div>Loading...</div>
  }

  const authors = result.data.allAuthors
  
  if (!props.show) {
    return null
  }

  return (
    
    <div>
      <h2>authors</h2>

      <table>
        <tbody>

          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>

          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}

        </tbody>
      </table>

      <BirthdayForm setMessage={props.setMessage} />

    </div>
  )
}

export default Authors
