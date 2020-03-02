import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers } from '../reducers/userStatsReducer'
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom'
import User from './User'
import Table from 'react-bootstrap/Table'


const UsersStats = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    const users = useSelector(state => state.users)

    const match = useRouteMatch('/users/:id')
    const user = match ? users.find(u => u.id === match.params.id) : null

    return (
        <div>
            <Switch>
                <Route path='/users/:id'>
                    <User user={user} />
                </Route>

                <Route path='/users'>
                    <h2>Users</h2>


                    <Table striped>
                        <thead>
                            <tr>
                                <th></th>
                                <th>blogs created</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map(u =>
                                <tr key={u.id}>
                                    <td><Link to={`/users/${u.id}`}> {u.name}</Link> </td>
                                    <td>{u.blogs.length} </td>

                                </tr>
                            )}
                        </tbody>
                    </Table>

                </Route>
            </Switch>

        </div>
    )
}

export default UsersStats