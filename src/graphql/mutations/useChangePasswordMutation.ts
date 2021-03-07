import { gql, useMutation } from "@apollo/client";

const CHANGE_PW_MUTATION = gql`
    mutation ChangePassword( $token:String!, $newPassword:String! ) {
        changePassword( token:$token, newPassword: $newPassword ){
            errors {
                field
                message
            }
            user {
                id
            }
        }
    }
`
const useChangePasswordMutation = () => useMutation( CHANGE_PW_MUTATION )

export default useChangePasswordMutation
