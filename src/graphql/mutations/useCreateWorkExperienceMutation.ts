import { gql, Reference, useMutation } from "@apollo/client";
import { Profile, WorkExperience } from "../../types";
import { WORK_EXP_FRAGMENT } from "../fragments";
import produce from "immer";

const CREATE_WORK_EXP_GQL = gql`
    ${WORK_EXP_FRAGMENT}
    mutation CreateWorkExp($workExperience:CreateWorkExpInput!){
        createWorkExperience(workExperience: $workExperience){
            ...WorkExperienceFragment
        }
    }
`

type Response = {
    createWorkExperience: WorkExperience
}

type Variables = {
    workExperience: WorkExperience
}

const useCreateWorkExperienceMutation = () => useMutation<Response, Variables>( CREATE_WORK_EXP_GQL, {
    update( cache, { data } ) {
        const { createWorkExperience: newWorkExpItem } = data || {}
        if( !newWorkExpItem ) {
            return
        }
        cache.modify( {
            fields: {
                profile( profile: Profile, { readField } ) {
                    const newWorkExpRef: Reference | undefined = cache.writeFragment( {
                        data: newWorkExpItem,
                        fragment: WORK_EXP_FRAGMENT
                    } )
                    const isWorkExpAlreadyInCache = profile.workExperiences.some(
                        workExpRef => readField( "id", workExpRef ) === newWorkExpItem.id
                    )
                    if( isWorkExpAlreadyInCache ) {
                        return profile
                    }
                    return produce( profile, function( draft ) {
                        draft.workExperiences.push( newWorkExpRef as unknown as WorkExperience )
                    } )
                }
            }
        } )
    }
} )

export default useCreateWorkExperienceMutation
