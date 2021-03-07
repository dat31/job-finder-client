import { gql, useMutation } from "@apollo/client";
import { Profile } from "../../types";
import produce from "immer";

const DELETE_WORK_EXP_GQL = gql`
    mutation DeleteWorkExperience( $id: Float! ) {
        deleteWorkExperience(id: $id)
    }
`

type Response = {
    deleteWorkExperience: number
}

type Variables = {
    id: number
}

const useDeleteWorkExperienceMutation = () => useMutation<Response, Variables>( DELETE_WORK_EXP_GQL, {
    update( cache, { data } ) {
        const { deleteWorkExperience: deletedId } = data || {}
        if( !deletedId ) {
            return
        }
        cache.modify( {
            fields: {
                profile( profile: Profile, { readField } ) {
                    return produce( profile, function( draft ) {
                        const idx = draft.workExperiences.findIndex(
                            ( workExpRef ) => readField( "id", workExpRef ) === deletedId
                        )
                        if( idx !== -1 ) {
                            draft.workExperiences.splice( idx, 1 )
                        }
                    } )
                }
            }
        } )
    }
} )

export default useDeleteWorkExperienceMutation
