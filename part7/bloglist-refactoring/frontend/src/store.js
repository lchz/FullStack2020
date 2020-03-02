import { combineReducers, createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import blogReducer from "./reducers/blogReducer"
import notificationReducer from "./reducers/notificationReducer"
import userReducer from "./reducers/userReducer"
import userStatsReducer from "./reducers/userStatsReducer"
import commentReducer from "./reducers/commentReducer"



const reducer = combineReducers({
    blogs: blogReducer,
    user: userReducer,
    users: userStatsReducer,
    comments: commentReducer,
    notification: notificationReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)


export default store