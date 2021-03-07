import { gql, useMutation } from "@apollo/client";
import { ERROR_FRAGMENT } from "../fragments";
import { FieldErrors, User } from "../../types";
import { apolloClient } from "../../withApollo";

const REGISTER_MUTATION = gql`
    ${ERROR_FRAGMENT}
    mutation Login( $usernameOrEmail: String!, $password: String! ) {
        login(  usernameOrEmail: $usernameOrEmail, password: $password  ) {
            user {
                username,
                id,
                email,
            }
            errors {
                ...ErrorFragment,
            }
        }
    }
`

type LoginResponse = {
    login: {
        errors: FieldErrors
        user: User
    }
}

const useLoginMutation = () => useMutation<LoginResponse>( REGISTER_MUTATION, {
    client: apolloClient,
    update( cache, { data } ) {
        if( data?.login.errors ) {
            return
        }
        cache.modify( {
            fields: {
                currentUser: () => data?.login.user
            }
        } )
    }
} )

export default useLoginMutation
