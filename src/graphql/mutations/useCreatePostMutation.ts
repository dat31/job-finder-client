import { useMutation, gql } from "@apollo/client";
import { PostFragment } from "../fragments";

const CREATE_POST_MUTATION = gql`
    mutation CreatePost($input:PostInput!) {
        createPost(input:$input) {
            title
            text
            id
            creatorId
        }
    }
`

const readUserFragment = ( cache ) => cache.readFragment( {
    id: 'User:1',
    fragment: gql`
        fragment  _ on User {
            username
        }
    `
} )

const writePostFragment = ( createPost, cache, username ) => cache.writeFragment( {
    data: {
        ...createPost,
        voteStatus: null,
        points: 0,
        creator: {
            username
        }
    },
    fragment: PostFragment
} )

const useCreatePostMutation = () => useMutation(
    CREATE_POST_MUTATION,
    {
        update( cache, { data: { createPost } } ) {
            const { username } = readUserFragment( cache )
            cache.modify( {
                fields: {
                    posts( postsData = {}, { readField } ) {
                        const {
                            posts: existingPostRefs = [],
                            hasMore
                        } = postsData
                        const newPostRef = writePostFragment( createPost, cache, username )
                        const isPostAlreadyInCache = existingPostRefs.some(
                            ( ref ) => ( readField( 'id', ref ) === createPost.id )
                        )
                        if ( isPostAlreadyInCache ) {
                            return postsData
                        }
                        return {
                            hasMore,
                            posts: [
                                newPostRef,
                                ...existingPostRefs,
                            ]
                        }
                    }
                }
            } )
        }
    } )

export default useCreatePostMutation
