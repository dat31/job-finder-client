import { Profile } from "../../types";
import { gql, useQuery } from "@apollo/client";
import { WORK_EXP_FRAGMENT, WORK_SKILL_FRAGMENT } from "../fragments";

const GQL = gql`
    ${WORK_EXP_FRAGMENT}
    ${WORK_SKILL_FRAGMENT}
    query {
        profile {
            workExperiences {
                ...WorkExperienceFragment
            }
            workSkills {
                ...WorkSkillFragment
            }
        }
    }
`

type Response = {
    profile: Profile
}

const useProfileQuery = () => useQuery<Response>( GQL )
export default useProfileQuery
