import { questionError, questionLoading, questionAskedTome, questionAsked } from './question.actionType';
import axios from 'axios';
import { getAllblog } from '../BlogReducer/Blog.action';
export const askQuestion = ( data ) => async ( dispatch ) => {
    dispatch( { type: questionLoading } )
    try {
        await axios.post( 'http://localhost:3000/question/create', data, {
            headers: {
                Authorization: `Bearer ${ localStorage.getItem( "user" ) }`
            }
        } );
        dispatch( getAllblog() );

        return true;
    } catch ( e ) {

        dispatch( { type: questionError } );
        return false;
    }


}
export const getQuestionbyUser = ( id ) => async ( dispatch ) => {
    dispatch( { type: questionLoading } )

    try {
        let res = await axios.get( `http://localhost:3000/question/user/${ id }`, {
            headers: {
                Authorization: `Bearer ${ localStorage.getItem( "user" ) }`
            }
        } );

        dispatch( { type: questionAsked, payload: res.data.data } );

    } catch ( e ) {

        dispatch( { type: questionError } );
    }


}
export const getQuestionToMe = ( id ) => async ( dispatch ) => {
    dispatch( { type: questionLoading } )

    try {
        let res = await axios.get( `http://localhost:3000/question/askedtome/${ id }`, {
            headers: {
                Authorization: `Bearer ${ localStorage.getItem( "user" ) }`
            }
        } );

        dispatch( { type: questionAskedTome, payload: res.data.data } );

    } catch ( e ) {

        dispatch( { type: questionError } );
    }


}

export const addAnswer = ( id, answer ) => async ( dispatch ) => {
    dispatch( { type: questionLoading } );

    try {
        let res = await axios.post( `http://localhost:3000/question/answer/${ id }`, { answer: answer }, {
            headers: {
                Authorization: `Bearer ${ localStorage.getItem( "user" ) }`
            }
        } );

        dispatch( getQuestionToMe( res.data.data.blogUser ) );

    } catch ( e ) {

        dispatch( { type: questionError } );
    }


}
export const updateQuestion = ( id, question ) => async ( dispatch ) => {
    dispatch( { type: questionLoading } );

    try {
        let res = await axios.patch( `http://localhost:3000/question/${ id }`, { question: question }, {
            headers: {
                Authorization: `Bearer ${ localStorage.getItem( "user" ) }`
            }
        } );
        dispatch( getQuestionbyUser( res.data.data.userId ) );

    } catch ( e ) {

        dispatch( { type: questionError } );
    }


}

export const deleteQuestion = ( id ) => async ( dispatch ) => {

    dispatch( { type: questionLoading } );

    try {
        let res = await axios.delete( `http://localhost:3000/question/${ id }`, {
            headers: {
                Authorization: `Bearer ${ localStorage.getItem( "user" ) }`
            }
        } );

        dispatch( getQuestionbyUser( res.data.data.userId ) );

    } catch ( e ) {

        dispatch( { type: questionError } );
    }

}

export const getQuestionByBlog = async ( id ) => {
    return await axios.get( `http://localhost:3000/question/blog/${ id }`, {
        headers: {
            Authorization: `Bearer ${ localStorage.getItem( "user" ) }`
        }
    } );
}