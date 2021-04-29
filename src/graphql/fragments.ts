import { gql } from "@apollo/client";

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
        requirements
        hasBeenSaved
        hasBeenReported
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
