import { gql, useQuery } from "@apollo/client";
import { User } from "../../types";

const GET_CURRENT_USER_GQL = gql`
    query CurrentUser {
        currentUser {
            id
            username,
            email,
        }
    }
`

type Response = {
    currentUser: User
}

const useCurrentUserQuery = () => useQuery<Response>( GET_CURRENT_USER_GQL, {
    skip: typeof window === 'undefined'
} )
export default useCurrentUserQuery
