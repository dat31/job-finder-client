import { gql, useQuery } from "@apollo/client";
import { Job } from "../../types";
import { JOB_FRAGMENT } from "../fragments";

const GET_NEWEST_JOB_QUERY = gql`
    ${JOB_FRAGMENT}
    query GetAllNewestJobs {
        newestJob {
            ...JobFragment
        }
    }
`

type JobData = {
    newestJob: Job[]
}

const useNewestJobQuery = () => useQuery<JobData, any>( GET_NEWEST_JOB_QUERY )
export default useNewestJobQuery
