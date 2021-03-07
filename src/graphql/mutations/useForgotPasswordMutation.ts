import { gql, useMutation } from "@apollo/client";

const FORGOT_PW_MUTATION = gql`
    mutation ForgotPassword($email:String!) {
        forgotPassword(email: $email)
    }
`

const useForgotPasswordMutation = () => useMutation( FORGOT_PW_MUTATION )

export default useForgotPasswordMutation
