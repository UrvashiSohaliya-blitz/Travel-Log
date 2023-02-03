import axios from 'axios';
export const updateBlog = async ( id, data ) => {
    return await axios.patch( `http://localhost:3000/blogs/${ id }`, data )
}

