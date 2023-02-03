import { questionError, questionLoading, questionAskedTome, questionAsked } from './question.actionType';

const initialState = {
    questionLoading: false,
    allQuestions: [],
    questionError: false,
    myQuestions: []
}
export const questionReducer = ( state = initialState, { type, payload } ) => {

    switch ( type ) {
        case questionLoading: {
            return { ...state, questionLoading: true }
        }
        case questionAskedTome: {
            return { ...state, questionLoading: false, allQuestions: payload, questionError: false }
        }
        case questionAsked: {
            return { ...state, questionLoading: false, myQuestions: payload, questionError: false }
        }
        case questionError: {

            return { ...state, questionError: true, questionLoading: false }
        }
        default: {
            return state
        }
    }

}