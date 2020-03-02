import userService from '../services/users'

const userStatsReducer = (state=[], action) => {
    switch (action.type) {
        case 'GET_ALL_USERS':
            console.log('State:', state)
            return action.users

        default:
            return state
    }
}

export const getAllUsers = () => {

    return async dispatch => {
        const users = await userService.getAll()
        dispatch({
            type: 'GET_ALL_USERS',
            users
        })
    }
}


export default userStatsReducer