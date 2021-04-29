import { gql, useQuery } from "@apollo/client";
import { Job } from "../../types";
import { JOB_FRAGMENT } from "../fragments";

const GET_HOTTEST_JOBS_QUERY = gql`
    ${JOB_FRAGMENT}
    query GetAllHottestJobs {
        hottestJob {
            ...JobFragment
        }
    }
`

type JobData = {
    hottestJob: Job[]
}

const useHottestJobQuery = () => useQuery<JobData, any>( GET_HOTTEST_JOBS_QUERY )
export default useHottestJobQuery
