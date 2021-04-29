import { gql, useMutation } from "@apollo/client";
import { WORK_EXP_FRAGMENT } from "../fragments";
import { Profile, WorkExperience } from "../../types";
import produce from "immer";
import { WritableDraft } from "immer/dist/types/types-external";

const EDIT_WORK_EXP_GQL = gql`
    ${WORK_EXP_FRAGMENT}
    mutation EditWorkExperience($workExperience: UpdateWorkExpInput!){
        updateWorkExperience(workExperience: $workExperience){
            ...WorkExperienceFragment
        }
    }
`

type Response = {
    updateWorkExperience: WorkExperience
}

type Variables = {
    workExperience: Omit<WorkExperience, "userId" | "__typename">
}

const useUpdateWorkExperienceMutation = () => useMutation<Response, Variables>( EDIT_WORK_EXP_GQL, {
    update( cache, { data } ) {
        const { updateWorkExperience } = data || {}
        if( !updateWorkExperience ) {
            return
        }
        cache.modify( {
            fields: {
                profile( profile: Profile, { readField } ) {
                    const idx = profile.workExperiences.findIndex(
                        ( workExpRef ) => readField( "id", workExpRef ) === updateWorkExperience.id
                    )
                    if( idx === -1 ) {
                        return profile
                    }
                    return produce( profile, function( draft ) {
                        const newWorkExpRef = cache.writeFragment( {
                            data: updateWorkExperience,
                            fragment: WORK_EXP_FRAGMENT,
                        } )
                        if( !updateWorkExperience ) {
                            return;
                        }
                        draft.workExperiences[idx] = newWorkExpRef as unknown as WritableDraft<WorkExperience>
                    } )
                }
            }
        } )
    }
} )
export default useUpdateWorkExperienceMutation
