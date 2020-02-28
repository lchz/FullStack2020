
const notificationReducer = (state = null, action) => {

    switch (action.type) {
        case 'NEW_NOTIFICATION':
            return action.notification

        case 'CLEAR_NOTIFICATION':
            return null

        default:
            return state
    }

}

let timeoutId

export const setNotification = (notification, time) => {
    return dispatch => {

        dispatch({
            type: 'NEW_NOTIFICATION',
            notification
        })

        clearTimeout(timeoutId)

        timeoutId = setTimeout(() => {
            dispatch(clearNotification())

        }, time * 1000);
    }
}

export const clearNotification = () => (
    { type: 'CLEAR_NOTIFICATION' }
)

export default notificationReducer