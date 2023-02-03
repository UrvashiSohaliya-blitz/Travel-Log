import { questionError, questionLoading, questionSuccess } from './question.actionType';
import axios from 'axios';
export const askQuestion = ( data ) => async ( dispatch ) => {
    dispatch( { type: questionLoading } )
    try {
        await axios.post( 'http://localhost:3000/question/create', data );
        dispatch( getQuestionbyUser() );

    } catch ( e ) {
        dispatch( { type: questionError } );
    }


}
export const getQuestionbyUser = ( id ) => async ( dispatch ) => {
    dispatch( { type: questionLoading } )
    try {
        let res = await axios.get( `http://localhost:3000/question/user/${ id }` );
        dispatch( { type: questionSuccess, payload: res.data.data } );

    } catch ( e ) {
        dispatch( { type: questionError } );
    }


}
