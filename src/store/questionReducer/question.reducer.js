import { questionError, questionLoading, questionSuccess } from './question.actionType';

const initialState = {
    questionLoading: false,
    data: [],
    questionError: false
}
export const questionReducer = ( state = initialState, { type, payload } ) => {

    switch ( type ) {
        case questionLoading: {
            return { ...state, questionLoading: true }
        }
        case questionSuccess: {
            return { ...state, questionLoading: false, data: payload }
        }
        case questionError: {
            return { ...state, questionError: true, questionLoading: false }
        }
        default: {
            return state
        }
    }

}