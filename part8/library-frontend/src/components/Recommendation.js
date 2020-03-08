import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'


const Recommendation = (props) => {
    const [favorite, setFavorite] = useState(null)
    const [recommendBooks, setRecommendBooks] = useState([])

    const { data: meData } = useQuery(ME)
    const { data: bookData } = useQuery(ALL_BOOKS, {
        variables: { genre: favorite }
    })

    useEffect(() => {
        if (props.token) {
            if (meData && meData.me) {
                setFavorite(meData.me.favoriteGenre)
            }

            if (bookData) {
                setRecommendBooks(bookData.allBooks)
            }
        } else {
            setFavorite(null)
            setRecommendBooks([])
        }

    }, [ meData, bookData, props.token])

    if (!props.show) {
        return null
    }


    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite genre patterns</p>
            <table>
                <tbody>
                    <tr>
                        <th>
                            {favorite}
                        </th>
                        <th>
                            author
                        </th>
                        <th>
                            published
                        </th>
                    </tr>

                    {recommendBooks.map(r =>
                        <tr key={r.id}>
                            <td>{r.title}</td>
                            <td>{r.author.name} </td>
                            <td>{r.published} </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}


export default Recommendation