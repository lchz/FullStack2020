
const notificationReducer = (state = null, action) => {

    switch (action.type) {
        case 'SET_NOTIF':
            return action.message
        default:
            return state
    }
}

export const notifVoteChange = value => {
    return {
        type: 'SET_NOTIF',
        message: `you voted '${value}'`
    }
}

export const notifNoteChange = value => {
    return {
        type: 'SET_NOTIF',
        message: `you added '${value}'`
    }
}

export const notifReset = () => {
    return {
        type: 'SET_NOTIF',
        message: null
    }
}

export default notificationReducer