import axios from 'axios';

export const signupUser = ( data ) => {

    return axios.post( 'http://localhost:3000/signup', data );

}

export const loginUser = async ( data ) => {
    return await axios.post( 'http://localhost:3000/login', data );

}