import { withApollo } from "next-apollo";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { from } from "apollo-link";
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { PaginatedResponse } from "../types";
import produce from "immer";
import { requireAuthModalRef } from "../components/shared/RequireAuthModal";
import { NextPageContext } from "next";

function createHttpLink( fetch: ( input: RequestInfo, init?: ( RequestInit | undefined ) ) => Promise<Response> ) {
    return new HttpLink( {
        uri: 'http://localhost:4000/graphql',
        // uri: 'https://my-app-31.herokuapp.com/graphql',
        credentials: 'include',
        fetch
    } );
}

const authAfterware = onError( ( { graphQLErrors, operation } ) => {
    if( !graphQLErrors ) {
        return
    }
    const isRequireAuth = graphQLErrors.some(
        ( { message } ) => message.includes( "authorized" )
    )
    const { operationName } = operation
    if( isRequireAuth ) {
        requireAuthModalRef.current?.requireAuthForAction(
            operationName === "ReportJob" && "Report job"
            || operationName === "SaveJob" && "Save job"
            || undefined
        )
    }
} )

// @ts-ignore
function mergePaginatedResponse<T>( existing: PaginatedResponse<T>, incoming: PaginatedResponse<T> ) {
    return produce( existing, function( draft ) {
        draft.items.push.apply( incoming.items )
        draft.hasMore = incoming.hasMore
    } )
}

//https://github.com/apollographql/apollo-client/issues/5089
function createApolloClient( ctx: NextPageContext | undefined ): ApolloClient<NormalizedCacheObject> {

    function enhancedFetch( url: RequestInfo, init: RequestInit | undefined ) {
        return fetch( url, {
            ...init,
            headers: {
                ...init?.headers,
                Cookie: ctx?.req?.headers.cookie as string,
            },
        } )
    }

    return new ApolloClient( {
        ssrMode: true,
        link: from( [
            authAfterware,
            createHttpLink( ctx ? enhancedFetch : fetch ) as any,
        ] ) as any,
        cache: new InMemoryCache(),
    } );
}

export default withApollo( createApolloClient )
