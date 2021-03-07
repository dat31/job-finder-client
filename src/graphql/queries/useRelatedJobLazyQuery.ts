import { gql, useLazyQuery } from "@apollo/client";
import { JOB_SECTION_LIST_RESPONSE_FRAGMENT } from "../fragments";
import { Job } from "../../types";

const RELATED_JOB_QUERY = gql`
    ${JOB_SECTION_LIST_RESPONSE_FRAGMENT}
    query GetRelatedJobs( $jobCategory:String!, $companyId:Int!, $currentJobId: Int! ) {
        relatedJobs( companyId: $companyId, jobCategory: $jobCategory, currentJobId: $currentJobId ) {
            ...JobSectionListResponseFragment
        }
    }
`

type Response = {
    relatedJobs: { items: Job[] }
}

type Variables = {
    jobCategory: string
    companyId: number
    currentJobId: number
}


const useRelatedJobQuery = () => useLazyQuery<Response, Variables>( RELATED_JOB_QUERY )

export default useRelatedJobQuery
