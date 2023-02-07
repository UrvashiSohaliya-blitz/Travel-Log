import { BlogError, AllBlogSuccess, UserBlogSuccess, setCurruntUserPage, BlogLoading, setCurruntPage, setSortBlogs } from "./Blog.actionType";
const initialState = {

    AllBlogs: [],
    userBlogs: [],
    blogLoading: false,
    blogError: false,
    curruntPage: 1,
    currUserPage: 1,
    TotalPages: 0,
    SortBlogs: -1
}
export const blogReducer = ( state = initialState, { type, payload } ) => {

    switch ( type ) {
        case BlogLoading: {
            return { ...state, blogLoading: true }
        }
        case AllBlogSuccess: {

            return { ...state, authLoading: false, blogError: false, AllBlogs: payload.data, TotalPages: payload.TotalPages }
        }
        case UserBlogSuccess: {

            return { ...state, authLoading: false, blogError: false, userBlogs: payload.data, TotalPages: payload.TotalPages }
        }

        case BlogError: {

            return { ...state, blogError: true, blogError: false }
        }
        case setCurruntPage: {
            return { ...state, curruntPage: payload }
        }
        case setCurruntUserPage: {
            return { ...state, currUserPage: payload }
        }
        case setSortBlogs: {
            return { ...state, SortBlogs: payload }
        }
        default: {
            return state
        }
    }

}