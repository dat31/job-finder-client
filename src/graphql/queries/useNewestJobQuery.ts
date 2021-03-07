import { gql, useQuery } from "@apollo/client";
import { Job } from "../../types";
import { JOB_SECTION_LIST_RESPONSE_FRAGMENT } from "../fragments";

const GET_NEWEST_JOB_QUERY = gql`
    ${JOB_SECTION_LIST_RESPONSE_FRAGMENT}
    query GetAllHottestJobs {
        newestJob {
            ...JobSectionListResponseFragment
        }
    }
`

type JobData = {
    newestJob: { items: Job[] }
}

const useNewestJobQuery = () => useQuery<JobData, any>( GET_NEWEST_JOB_QUERY )
export default useNewestJobQuery
