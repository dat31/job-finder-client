import { usePostQuery } from "../graphql/queries";
import { useEffect } from "react";

function useLoadPostDetail( postId: string | number ) {

    const [
        getPostDetail,
        response
    ] = usePostQuery( parseInt( postId as string ) )

    useEffect( () => {
        if ( postId ) {
            getPostDetail()
        }
    }, [ postId ] )

    return response
}

export default useLoadPostDetail
