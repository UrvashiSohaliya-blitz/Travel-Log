import axios from 'axios';
export const getUser = async ( id ) => {

    return await axios.get( `http://localhost:3000/users/${ id }` )
}

