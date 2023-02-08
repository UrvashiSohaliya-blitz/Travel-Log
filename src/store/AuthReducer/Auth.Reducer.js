import { AuthSuccess, Logout, AuthLoading, AuthError } from "./AuthAction";
const initState = {
    userId: localStorage.getItem( 'user' ) || null,
    username: localStorage.getItem( 'username' ) || '',
    authLoading: false,
    authError: false
}
export const authReducer = ( state = initState, { type, payload } ) => {

    switch ( type ) {
        case AuthLoading: {
            return { ...state, authLoading: true }
        }
        case AuthSuccess: {
            localStorage.setItem( 'username', payload.name )
            return { ...state, authLoading: false, userId: payload._id, authError: false, username: payload.name }
        }
        case Logout: {
            localStorage.removeItem( 'user' )
            return { ...state, authLoading: false, userId: "", authError: false, username: "" }
        }
        case AuthError: {

            return { ...state, authError: true, authLoading: false }
        }
        default: {
            return state
        }
    }

}