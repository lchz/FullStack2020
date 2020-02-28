import blogService from '../services/blogs'


const blogReducer = (state = [], action) => {

    switch (action.type) {

        case 'INIT_BLOGS':
            return action.data

        case 'CREATE_BLOG':
            return [...state, action.data]

        case 'UPDATE_BLOG':
            return state.map(b => b.id === action.data.id ? action.data : b)

        case 'DELETE_BLOG':
            return state.filter(b => b.id !== action.data.id)

        default:
            return state
    }
}


export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const createBlog = (blogObject) => {
    return async dispatch => {
        const returnedBlog = await blogService.create(blogObject)
        dispatch({
            type: 'CREATE_BLOG',
            data: returnedBlog
        })
    }
}

export const toUpdateBlog = (blog) => {
    return async dispatch => {

        const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
        const returnedBlog = await blogService.update(blog.id, updatedBlog)
        dispatch({
            type: 'UPDATE_BLOG',
            data: returnedBlog
        })
    }
}

export const removeBlog = (blog) => {
    return async dispatch => {
        const deletedBlog = await blogService.deleting(blog.id)
        dispatch({
            type: 'DELETE_BLOG',
            data: blog
        })
    }
}

export default blogReducer