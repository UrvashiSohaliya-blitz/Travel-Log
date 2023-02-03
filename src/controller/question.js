import axios from 'axios';
export const askQuestion = async ( data ) => {
    return await axios.post( 'http://localhost:3000/question/create', data )

}
export const getQuestionbyUser = async ( id ) => {
    return await axios.get( `http://localhost:3000/question/user/${ id }` );
}