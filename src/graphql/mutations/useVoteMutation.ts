import { gql, useMutation } from "@apollo/client";
import { PostFragment } from "../fragments";

const VOTE_MUTATION = gql`
    mutation Vote( $value:Int!, $postId:Int! ){
        vote( value:$value, postId: $postId ){
            value
            postId
        }
    }
`

type Post = {
    points: number
    voteStatus: number
}

//TODO: https://www.apollographql.com/docs/react/caching/cache-field-behavior/
const useVoteMutation = () => useMutation(
    VOTE_MUTATION,
    {
        update( cache, { data } ) {
            const { postId: votedPostId, value } = data.vote
            console.log( data.vote )
            cache.modify( {
                fields: {
                    posts( { posts = [], hasMore } ) {
                        const p = []
                        posts.forEach( post => {
                            const [ , postId ] = post.__ref.split( ':' )
                            if ( postId === votedPostId.toString() ) {

                                const readPostRef: Post = cache.readFragment( {
                                    id: cache.identify( post ),
                                    fragment: PostFragment
                                } )

                                const newPostRef = cache.writeFragment( {
                                    data: {
                                        ...readPostRef,
                                        voteStatus: value,
                                        points: readPostRef.points + value
                                    },
                                    fragment: PostFragment
                                } )

                                p.push( newPostRef )
                            } else {
                                p.push( post )
                            }
                        } )
                        return {
                            posts: p,
                            hasMore
                        }
                    }
                }
            } )
        },
    }
)

export default useVoteMutation
