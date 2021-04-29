import { gql, useMutation } from "@apollo/client";
import { Profile, WorkSkill } from "../../types";
import produce from "immer";

const DELETE_WORK_SKILL_GQL = gql`
    mutation DeleteWorkSkill($id: Float!) {
        deleteWorkSkill(id: $id)
    }
`

type Response = {
    deleteWorkSkill: WorkSkill["id"]
}

type Variables = {
    id: WorkSkill["id"]
}

const useDeleteWorkSkillMutation = () => useMutation<Response, Variables>( DELETE_WORK_SKILL_GQL, {
    update( cache, { data } ) {
        const { deleteWorkSkill: deletedId } = data || {}

        console.log( "data", data )

        if( !deletedId ) {
            return
        }
        cache.modify( {
            fields: {
                profile( profile: Profile, { readField } ) {
                    return produce( profile, function( draft ) {
                        const idx = draft.workSkills.findIndex(
                            ( workSkillRef ) => readField( "id", workSkillRef ) === deletedId
                        )

                        console.log( "IDX", idx )

                        if( idx !== -1 ) {
                            draft.workSkills.splice( idx, 1 )
                        }
                    } )
                }
            }
        } )
    }
} )

export default useDeleteWorkSkillMutation
