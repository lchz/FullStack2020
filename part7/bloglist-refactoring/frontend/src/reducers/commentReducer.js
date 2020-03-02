import blogService from '../services/blogs'

const commentReducer = (state=[], action) => {
    switch(action.type) {

        case 'ADD_COMMENT':
            return [...state, action.data]
        
        case 'GET_ALL_COMMENTS':
            return action.data

        default:
            return state
    }
}

export const getComments = (id) => {
    return async dispatch => {
        const comments = await blogService.getComments(id)

        dispatch({
            type: 'GET_ALL_COMMENTS',
            data: comments
        })
    }
}


export const addComment = (content, id) => {
    return async dispatch => {

        const comment = {
            content
        }
        const updatedComment = await blogService.createComment(comment, id)

        dispatch({
            type: 'ADD_COMMENT',
            data: updatedComment
        })
    }
}

export default commentReducer