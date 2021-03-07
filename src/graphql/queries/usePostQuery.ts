import { gql, useLazyQuery } from "@apollo/client";
import { PostFragment } from "../fragments";
import { Post } from "../models";

const POST_QUERY = gql`
    ${PostFragment}
    query Post( $id: Int! ) {
        post( id: $id ){
            ...PostFragment
        }
    }
`

const usePostQuery = ( postId: Post['id'] ) => useLazyQuery(
    POST_QUERY,
    { variables: { id: postId } }
)

export default usePostQuery
