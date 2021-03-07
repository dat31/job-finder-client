import { gql, useMutation } from "@apollo/client";
import { ERROR_FRAGMENT } from "../fragments";
import { User } from "../../types";

const REGISTER_MUTATION = gql`
    ${ERROR_FRAGMENT}
    mutation Register( $username: String!, $email: String!, $password: String! ) {
        register( options: { username: $username, email: $email, password: $password } ) {
            user {
                username,
                id
            }
            errors {
                ...ErrorFragment
            }
        }
    }
`

type Response = {
    register: {
        user: User
    }
}

const useRegisterMutation = () => useMutation<Response>( REGISTER_MUTATION, {
    update( cache, { data } ) {
        const { user } = data?.register || {}
        if( !user ) {
            return;
        }
        cache.modify( {
            fields: {
                currentUser: () => user
            }
        } )
    }
} )

export default useRegisterMutation
