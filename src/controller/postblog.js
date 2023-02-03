import axios from 'axios';
export const postBlog = async ( data ) => {
    return await axios.post( 'http://localhost:3000/blogs/create', data );

}