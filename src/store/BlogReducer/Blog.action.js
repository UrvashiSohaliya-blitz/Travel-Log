import axios from 'axios';
import { BlogError, AllBlogSuccess, UserBlogSuccess, BlogLoading, } from "./Blog.actionType";
let reqInstance = axios.create( {
    headers: {
        Authorization: `Bearer ${ localStorage.getItem( "user" ) }`
    }
}
)

export const deleteBlog = ( id ) => async ( dispatch ) => {
    dispatch( { type: BlogLoading } );
    const user = localStorage.getItem( 'user' );
    try {
        await reqInstance.delete( `http://localhost:3000/blogs/${ id }`, {
            headers: {
                Authorization: `Bearer ${ localStorage.getItem( "user" ) }`
            }
        } );
        dispatch( getUserBlogs( 0, 6, -1, user ) );

        return true;
    } catch ( error ) {

        dispatch( { type: BlogError, payload: error.message } );
        return false;
    }

}

export const getAllblog = ( curruntPage = 0, limit = 6, sortbyTime = -1 ) => async ( dispatch ) => {


    dispatch( { type: BlogLoading } )

    try {
        let res = await axios.get( `http://localhost:3000/blogs?page=${ curruntPage }&limit=${ limit }&createdAt=${ sortbyTime }`, {
            headers: {
                Authorization: `Bearer ${ localStorage.getItem( "user" ) }`
            }
        } );

        dispatch( { type: AllBlogSuccess, payload: res.data } );

    } catch ( error ) {
        dispatch( { type: BlogError, payload: error.message } );

    }
}
export const getUserBlogs = ( page = 0, limit = 6, sortbyTime, user ) => async ( dispatch ) => {
    dispatch( { type: BlogLoading } )

    try {
        let res = await reqInstance.get( `http://localhost:3000/blogs?user=${ user }&page=${ page }&limit=${ limit }&createdAt=${ sortbyTime }` )

        dispatch( { type: UserBlogSuccess, payload: res.data } );

    } catch ( error ) {
        dispatch( { type: BlogError, payload: error.message } );

    }
}

export const postBlog = ( data ) => async ( dispatch ) => {
    dispatch( { type: BlogLoading } );
    try {
        await reqInstance.post( 'http://localhost:3000/blogs/create', data );

        dispatch( getAllblog() );

        return true;
    } catch ( error ) {
        dispatch( { type: BlogError, payload: error.message } );
        return false;
    }


}

export const getblogData = async ( id ) => {
    return await reqInstance.get( `http://localhost:3000/blogs/${ id }` )
}
export const updateBlog = ( id, data ) => async ( dispatch ) => {
    dispatch( { type: BlogLoading } );
    try {
        await reqInstance.patch( `http://localhost:3000/blogs/${ id }`, data );
        dispatch( getUserBlogs( 0, 6, -1, localStorage.getItem( 'user' ) ) );

        return true;
    } catch ( error ) {
        console.log( error )
        dispatch( { type: BlogError, payload: error.message } );
        return false;
    }

}

export const trash = () => async ( dispatch ) => {

    try {
        let res = await reqInstance.get( `http://localhost:3000/blogs/trash` );
        console.log( res )
        // dispatch( getUserBlogs( 0, 6, -1, user ) );

        return true;
    } catch ( error ) {

        //dispatch( { type: BlogError, payload: error.message } );
        return false;
    }

}
