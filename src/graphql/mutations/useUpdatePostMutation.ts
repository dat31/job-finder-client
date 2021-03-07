import { gql, useMutation } from "@apollo/client";
import { PostFragment } from "../fragments";

const UPDATE_POST_MUTATION = gql`
    ${PostFragment}
    mutation UpdatePost( $title:String!, $text:String!, $id:Int! ) {
        updatePost( id: $id, text: $text, title: $title) {
            ...PostFragment
        }
    }
`

const useUpdatePostMutation = () => useMutation( UPDATE_POST_MUTATION )
export default useUpdatePostMutation