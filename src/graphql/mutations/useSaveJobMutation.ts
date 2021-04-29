import { gql, useMutation } from "@apollo/client";
import { JOB_FRAGMENT } from "../fragments";
import { Job } from "../../types";

const GQL = gql`
    mutation SaveJob($jobId: Int!) {
        saveJob(jobId: $jobId)
    }
`

type Response = {
    saveJob: number
}

type Variables = {
    jobId: number
}

const useSaveJobMutation = () => useMutation<Response, Variables>( GQL, {
    update( cache, { data } ) {
        const { saveJob: savedJobId } = data || {}
        if( !savedJobId ) {
            return
        }
        const jobRef = cache.readFragment( {
            id: `Job:${ savedJobId }`,
            fragment: JOB_FRAGMENT
        } ) as Job
        if( !jobRef ) {
            return
        }
        cache.writeFragment( {
            data: { ...jobRef, hasBeenSaved: !jobRef.hasBeenSaved },
            fragment: JOB_FRAGMENT
        } )
    }
} )
export default useSaveJobMutation
