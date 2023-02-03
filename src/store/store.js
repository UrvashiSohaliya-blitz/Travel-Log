import { questionReducer } from "./questionReducer/question.reducer";
import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
const rootReducer = combineReducers( { question: questionReducer } );
export const store = legacy_createStore( rootReducer, applyMiddleware( thunk ) )