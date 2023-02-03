import axios from 'axios';
export const getblog = async ( page = 0, limit = 6, sortbyTime, user ) => {
    console.log( sortbyTime )
    return user ? await axios.get( `http://localhost:3000/blogs?user=${ user }&page=${ page }&limit=${ limit }&createdAt=${ sortbyTime }` )
        : await axios.get( `http://localhost:3000/blogs?page=${ page }&limit=${ limit }&createdAt=${ sortbyTime }` )
}

export const getblogData = async ( id ) => {
    return await axios.get( `http://localhost:3000/blogs/${ id }` )
} 