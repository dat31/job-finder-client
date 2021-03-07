import { gql, useLazyQuery } from "@apollo/client";
import { JOB_FRAGMENT } from "../fragments";
import { Job } from "../../types";

const JOB_QUERY = gql`
    ${JOB_FRAGMENT}
    query GetJobById($id:Int!) {
        job(id: $id){
            ...JobFragment
        }
    }
`

type QueryRes = {
    job: Job
}

type Variables = {
    id: number
}

const useJobLazyQuery = () => useLazyQuery<QueryRes, Variables>( JOB_QUERY )

export default useJobLazyQuery
