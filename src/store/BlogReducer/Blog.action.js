import axios from 'axios';
import { BlogError, AllBlogSuccess, UserBlogSuccess, BlogLoading, } from "./Blog.actionType";

export const deleteBlog = ( id ) => async ( dispatch ) => {
    dispatch( { type: BlogLoading } )
    try {
        await axios.delete( `http://localhost:3000/blogs/${ id }` );
        dispatch( getAllblog() );
    } catch ( error ) {
        dispatch( { type: BlogError, payload: error.message } );
    }

}

export const getAllblog = ( curruntPage = 0, limit = 6, sortbyTime = -1 ) => async ( dispatch ) => {

    dispatch( { type: BlogLoading } )

    try {
        let res = await axios.get( `http://localhost:3000/blogs?page=${ curruntPage }&limit=${ limit }&createdAt=${ sortbyTime }` );
        dispatch( { type: AllBlogSuccess, payload: res.data } );

    } catch ( error ) {
        dispatch( { type: BlogError, payload: error.message } );

    }
}
export const getUserBlogs = ( page = 0, limit = 6, sortbyTime, user ) => async ( dispatch ) => {
    dispatch( { type: BlogLoading } )

    try {
        let res = await axios.get( `http://localhost:3000/blogs?user=${ user }&page=${ page }&limit=${ limit }&createdAt=${ sortbyTime }` )

        dispatch( { type: UserBlogSuccess, payload: res.data } );

    } catch ( error ) {
        dispatch( { type: BlogError, payload: error.message } );

    }
}

export const postBlog = ( data ) => async ( dispatch ) => {
    dispatch( { type: BlogLoading } );
    try {
        let res = await axios.post( 'http://localhost:3000/blogs/create', data );
        dispatch( getAllblog() );
    } catch ( error ) {
        dispatch( { type: BlogError, payload: error.message } );
    }


}

export const getblogData = async ( id ) => {
    return await axios.get( `http://localhost:3000/blogs/${ id }` )
}
export const updateBlog = ( id, data ) => async ( dispatch ) => {
    dispatch( { type: BlogLoading } );
    try {
        await axios.patch( `http://localhost:3000/blogs/${ id }`, data );
        dispatch( getAllblog() );
    } catch ( error ) {
        dispatch( { type: BlogError, payload: error.message } );
    }

}

