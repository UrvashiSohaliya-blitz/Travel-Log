import { questionReducer } from "./questionReducer/question.reducer";
import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./AuthReducer/Auth.Reducer";
const rootReducer = combineReducers(
    {
        question: questionReducer,
        auth: authReducer
    }

);
export const store = legacy_createStore( rootReducer, applyMiddleware( thunk ) );
