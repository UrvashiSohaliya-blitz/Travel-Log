import axios from 'axios';
export const deleteBlog = async ( id ) => {
    return await axios.delete( `http://localhost:3000/blogs/${ id }` )
}

