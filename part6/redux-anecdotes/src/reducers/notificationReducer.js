
const notificationReducer = (state='', action) => {

    switch (action.type) {

        case 'SET_NOTIF':
            return action.message

        default:
            return state
    }
}

let timeOutId

export const setNotification = (message, time) => {
    return dispatch => {
        const t = Number(time) * 1000

        dispatch({
            type: 'SET_NOTIF',
            message
        })

        clearTimeout(timeOutId)
        timeOutId = setTimeout(() => {
            dispatch({
                type: 'SET_NOTIF',
                message: null
            })
        }, t)
    }
}

export default notificationReducer