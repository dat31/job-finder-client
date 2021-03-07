import { gql, useMutation } from "@apollo/client";

const DELETE_POST_MUTATION = gql`
    mutation DeletePost($id:Int!){
        deletePost(id: $id)
    }
`

const useDeletePostMutation = () => useMutation( DELETE_POST_MUTATION, {
    update( cache, { data } ) {

        const { deletePost: deletedPostId } = data || {}

        if ( !deletedPostId ) return

        cache.modify( {
            fields: {
                posts( { posts = [], hasMore }, { readField } ) {
                    return {
                        hasMore,
                        posts: posts.filter(
                            ( postRef ) => readField( 'id', postRef ) !== deletedPostId )
                    }
                }
            }
        } )
    }
} )

export default useDeletePostMutation
