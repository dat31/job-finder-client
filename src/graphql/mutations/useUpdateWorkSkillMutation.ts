import { gql, useMutation } from "@apollo/client";
import { WORK_SKILL_FRAGMENT } from "../fragments";
import { WorkSkill } from "../../types";

const UPDATE_WORK_SKILL_GQL = gql`
    ${WORK_SKILL_FRAGMENT}
    mutation UpdateWorkSkill($workSkill: CreateWorkSkillInput!){
        updateWorkSkill(workSkill: $workSkill) {
            ...WorkSkillFragment
        }
    }
`

type Response = {
    updateWorkSkill: WorkSkill
}

type Variables = {
    workSkill: Omit<WorkSkill, "userId" | "__typename">
}

const useUpdateWorkSkillMutation = () => useMutation<Response, Variables>( UPDATE_WORK_SKILL_GQL, {} )

export default useUpdateWorkSkillMutation
