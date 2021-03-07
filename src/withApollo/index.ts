import { withApollo } from "next-apollo";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, from } from "apollo-link";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { PaginatedResponse } from "../types";
import produce from "immer";
import { requireAuthModalRef } from "../components/shared/RequireAuthModal";

const httpLink = new HttpLink( {
    uri: 'http://localhost:4000/graphql',
    // uri: 'https://my-app-31.herokuapp.com/graphql',
    credentials: 'include'
} );

const authAfterware = onError( ( { graphQLErrors } ) => {
    if( !graphQLErrors ) {
        return
    }
    const isRequireAuth = graphQLErrors.some(
        ( { message } ) => message.includes( "authorized" )
    )
    if( isRequireAuth ) {
        requireAuthModalRef.current?.requireAuthForAction( "Report job" )
    }
} )

const authMiddleware = new ApolloLink( ( operation, forward ) => {
    operation.setContext( ( { headers = {} } ) => {
        return ( {
            headers: {
                ...headers,
                ...( typeof window === 'undefined'
                    ? {}
                    : {} )
            }
        } )
    } );
    return forward( operation );
} )

const mergePostResponse = ( existing, incoming ) => {
    const { posts: inComingPosts, hasMore } = incoming
    const { posts: existingPosts = [] } = existing || {}
    return {
        posts: [ ...existingPosts, ...inComingPosts ],
        hasMore
    }
}

function mergePaginatedResponse<T>( existing: PaginatedResponse<T>, incoming: PaginatedResponse<T> ) {
    return produce( existing, function( draft ) {
        draft.items.push.apply( incoming.items )
        draft.hasMore = incoming.hasMore
    } )
}

export const apolloClient = new ApolloClient( {
    ssrMode: true,
    link: from( [
        authMiddleware,
        authAfterware,
        httpLink,
    ] ) as any,
    credentials: 'include',
    cache: new InMemoryCache( {
        typePolicies: {
            Query: {
                fields: {
                    posts: {
                        keyArgs: false,
                        merge: mergePostResponse,
                    }
                }
            },
        }
    } ),
} );

export default withApollo( apolloClient )
