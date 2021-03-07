import { gql, useQuery } from "@apollo/client";
import { Job } from "../../types";
import { JOB_SECTION_LIST_RESPONSE_FRAGMENT } from "../fragments";

const GET_HOTTEST_JOBS_QUERY = gql`
    ${JOB_SECTION_LIST_RESPONSE_FRAGMENT}
    query GetAllHottestJobs {
        hottestJob {
            ...JobSectionListResponseFragment
        }
    }
`

type JobData = {
    hottestJob: { items: Job[] }
}

const useHottestJobQuery = () => useQuery<JobData, any>( GET_HOTTEST_JOBS_QUERY )
export default useHottestJobQuery
