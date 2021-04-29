import { gql, useLazyQuery } from "@apollo/client";
import { JOB_FRAGMENT } from "../fragments";
import { Job } from "../../types";

const RELATED_JOB_QUERY = gql`
    ${JOB_FRAGMENT}
    query GetRelatedJobs( $jobCategory:String!, $companyId:Int!, $currentJobId: Int! ) {
        relatedJobs( companyId: $companyId, jobCategory: $jobCategory, currentJobId: $currentJobId ) {
            ...JobFragment
        }
    }
`

type Response = {
    relatedJobs: Job[]
}

type Variables = {
    jobCategory: string
    companyId: number
    currentJobId: number
}

const useRelatedJobQuery = () => useLazyQuery<Response, Variables>( RELATED_JOB_QUERY )

export default useRelatedJobQuery
