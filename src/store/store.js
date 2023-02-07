import { questionReducer } from "./questionReducer/question.reducer";
import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./AuthReducer/Auth.Reducer";
import { blogReducer } from "./BlogReducer/Blog.reducer";
const rootReducer = combineReducers(
    {
        question: questionReducer,
        auth: authReducer,
        blogs: blogReducer
    }

);
export const store = legacy_createStore( rootReducer, applyMiddleware( thunk ) );
