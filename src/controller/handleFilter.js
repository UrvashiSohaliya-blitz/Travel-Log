export const handleFilter = ( type, data ) => {
    let user = localStorage.getItem( 'user' );

    switch ( type.label ) {

        case 'All Blogs': {
            return data;
        }
        case 'My Blogs': {
            return data.filter( ( ele ) => ele.userId === user );
        }
        default: {
            return data;
        }

    }

}