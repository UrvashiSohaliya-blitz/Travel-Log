import axios from 'axios';
import { AuthSuccess, Logout, AuthLoading, AuthError } from "./AuthAction";
export const signupUser = ( data ) => async ( dispatch ) => {
    dispatch( { type: AuthLoading } );
    try {
        let res = await axios.post( 'http://localhost:3000/signup', data );

        localStorage.setItem( 'user', res.data.data._id );
        dispatch( { type: AuthSuccess, payload: res.data.data } );
    } catch ( error ) {
        dispatch( { type: AuthError } )
    }


}

export const loginUser = ( data ) => async ( dispatch ) => {

    dispatch( { type: AuthLoading } );
    try {
        let res = await axios.post( 'http://localhost:3000/login', data );

        localStorage.setItem( 'user', res.data.data._id );
        dispatch( { type: AuthSuccess, payload: res.data.data } );
    } catch ( error ) {
        dispatch( { type: AuthError } )
    }


}