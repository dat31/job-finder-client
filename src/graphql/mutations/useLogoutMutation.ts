import { gql, useMutation } from "@apollo/client";

const LOGOUT_MUTATION = gql`
    mutation Logout {
        logout
    }
`

const useLogoutMutation = () => useMutation(
    LOGOUT_MUTATION,
    {
        update( cache, { data } ) {
            if( !data?.logout ) {
                return
            }
            cache.modify( {
                fields: {
                    currentUser: () => null
                }
            } )
        }
    }
)
export default useLogoutMutation
