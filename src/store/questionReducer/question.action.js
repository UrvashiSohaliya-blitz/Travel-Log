import { questionError, questionLoading, questionAskedTome, questionAsked } from './question.actionType';
import axios from 'axios';
export const askQuestion = ( data ) => async ( dispatch ) => {
    dispatch( { type: questionLoading } )
    try {
        await axios.post( 'http://localhost:3000/question/create', data );
        dispatch( getQuestionbyUser( data.userId ) );

    } catch ( e ) {
        console.log( e )
        dispatch( { type: questionError } );
    }


}
export const getQuestionbyUser = ( id ) => async ( dispatch ) => {
    dispatch( { type: questionLoading } )

    try {
        let res = await axios.get( `http://localhost:3000/question/user/${ id }` );

        dispatch( { type: questionAsked, payload: res.data.data } );

    } catch ( e ) {

        dispatch( { type: questionError } );
    }


}
export const getQuestionToMe = ( id ) => async ( dispatch ) => {
    dispatch( { type: questionLoading } )

    try {
        let res = await axios.get( `http://localhost:3000/question/askedtome/${ id }` );
        dispatch( { type: questionAskedTome, payload: res.data.data } );

    } catch ( e ) {

        dispatch( { type: questionError } );
    }


}
