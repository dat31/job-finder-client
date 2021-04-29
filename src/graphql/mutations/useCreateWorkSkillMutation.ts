import { gql, Reference, useMutation } from "@apollo/client";
import { Profile, WorkSkill } from "../../types";
import { WORK_SKILL_FRAGMENT } from "../fragments";
import produce from "immer";

const CREATE_WORK_SKILL_GQL = gql`
    ${WORK_SKILL_FRAGMENT}
    mutation CreateWorkSkill( $workSkill:CreateWorkSkillInput! ) {
        createWorkSkill(workSkill: $workSkill) {
            ...WorkSkillFragment
        }
    }
`

type Variables = {
    workSkill: WorkSkill
}

type Response = {
    createWorkSkill: WorkSkill
}

const useCreateWorkSkillMutation = () => useMutation<Response, Variables>( CREATE_WORK_SKILL_GQL,
    {
        update( cache, { data } ) {
            const { createWorkSkill: newWorkSkillItem } = data || {}
            if( !newWorkSkillItem ) {
                return
            }
            cache.modify( {
                fields: {
                    profile( profile: Profile, { readField } ) {
                        const newWorkSkillRef: Reference | undefined = cache.writeFragment( {
                            data: newWorkSkillItem,
                            fragment: WORK_SKILL_FRAGMENT
                        } )
                        const isWorkExpAlreadyInCache = profile.workSkills.some(
                            workSkillRef => readField( "id", workSkillRef ) === newWorkSkillItem.id
                        )
                        if( isWorkExpAlreadyInCache ) {
                            return profile
                        }
                        return produce( profile, function( draft ) {
                            draft.workSkills.push( newWorkSkillRef as unknown as WorkSkill )
                        } )
                    }
                }
            } )
        }
    } )

export default useCreateWorkSkillMutation
