import axios from 'axios';
export const getblog = async ( page = 0, limit = 6, sortbyTime, user ) => {

    return user ? await axios.get( `http://localhost:3000/blogs?user=${ user }&page=${ page }&limit=${ limit }&createdAt=${ sortbyTime }` )
        : await axios.get( `http://localhost:3000/blogs?page=${ page }&limit=${ limit }&createdAt=${ sortbyTime }` )
}

export const getblogData = async ( id ) => {
    return await axios.get( `http://localhost:3000/blogs/${ id }` )
}
export const postBlog = async ( data ) => {
    return await axios.post( 'http://localhost:3000/blogs/create', data );

}

export const updateBlog = async ( id, data ) => {
    return await axios.patch( `http://localhost:3000/blogs/${ id }`, data )
}

