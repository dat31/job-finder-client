import { gql, useMutation } from "@apollo/client";
import { WorkSkill } from "../../types";
import { WORK_SKILL_FRAGMENT } from "../fragments";

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

const useCreateWorkSkillMutation = () => useMutation<Response, Variables>( CREATE_WORK_SKILL_GQL )

export default useCreateWorkSkillMutation
