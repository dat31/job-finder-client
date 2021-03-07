import { gql } from "@apollo/client";

export const PostFragment = gql`
    fragment PostFragment on Post {
        voteStatus
        id
        title
        text
        points
        creator {
            username
        }
    }
`

export const ERROR_FRAGMENT = gql`
    fragment ErrorFragment on ErrorField {
        message
        field
    }
`

export const JOB_FRAGMENT = gql`
    fragment JobFragment on Job {
        id
        companyId
        company {
            name
        }
        salary
        title
        description
    }
`

export const JOB_SECTION_LIST_RESPONSE_FRAGMENT = gql`
    ${JOB_FRAGMENT}
    fragment JobSectionListResponseFragment on JobResponse {
        items {
            ...JobFragment
        }
    }
`

export const WORK_EXP_FRAGMENT = gql`
    fragment WorkExperienceFragment on WorkExperience {
        id
        userId
        company
        jobTitle
    }
`

export const WORK_SKILL_FRAGMENT = gql`
    fragment WorkSkillFragment on WorkSkill {
        id
        userId
        skill
        yearOfExperience
    }
`
