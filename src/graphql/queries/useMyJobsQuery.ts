import { gql, useQuery } from "@apollo/client";
import { JOB_FRAGMENT } from "../fragments";
import { Job } from "../../types";

const GQL = gql`
    ${JOB_FRAGMENT}
    query GetCurrentUserJobs {
        myJobs {
            savedJobs {
                ...JobFragment
            }
            appliedJobs {
                ...JobFragment
            }
        }
    }
`

type Response = {
    myJobs: {
        savedJobs: Job[]
        appliedJobs: Job[]
    }
}

const useMyJobsQuery = () => useQuery<Response>( GQL )
export default useMyJobsQuery
