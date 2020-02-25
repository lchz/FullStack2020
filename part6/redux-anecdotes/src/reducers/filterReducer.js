
const filterReducer = (state = '', action) => {
    switch (action.type) {

        case 'FIND':
            return action.value
        default:
            return state
    }
}

export const filterChange = (value) => {
    return {
        type: 'FIND',
        value
    }
}


export default filterReducer