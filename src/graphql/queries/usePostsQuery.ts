import { gql, QueryHookOptions, useQuery } from "@apollo/client";
import { PostFragment } from "../fragments";

const POSTS_QUERY = gql`
    ${PostFragment}
    query Posts($top: Int, $skip: Int){
        posts(top: $top,skip: $skip) {
            posts {
                ...PostFragment
            }
            hasMore
        }
    }
`

const usePostsQuery = ( options: QueryHookOptions ) => useQuery( POSTS_QUERY, {
    ...options,
    ssr: true,
} )
export default usePostsQuery;
