import { gql, useMutation } from "@apollo/client";
import { JOB_FRAGMENT } from "../fragments";
import { Job, JobResponse } from "../../types";
import produce from "immer";

const REPORT_JOB_GQL = gql`
    ${JOB_FRAGMENT}
    mutation ReportJob( $jobId: Int! ) {
        reportJob( jobId: $jobId ){
            reportedJobId
            jobToReplace {
                ...JobFragment
            }
        }
    }
`

type Response = {
    reportJob: {
        jobToReplace: Job | undefined
        reportedJobId: Job["id"]
    }
}

const useReportJobMutation = () => useMutation<Response>( REPORT_JOB_GQL, {
    update( cache, { data } ) {
        const { reportedJobId, jobToReplace } = data?.reportJob || {}
        cache.modify( {
            fields: {
                hottestJob( hottestJobData: JobResponse, { readField } ) {
                    // replace reported job by another one
                    const newJobRef = cache.writeFragment( {
                        fragment: JOB_FRAGMENT,
                        data: jobToReplace
                    } )
                    return produce( hottestJobData, function( draft ) {
                        const reportedJobIdx = draft.items.findIndex(
                            ( jobRef ) => readField( "id", jobRef ) === reportedJobId
                        )
                        if( reportedJobIdx === -1 ) {
                            return
                        }
                        if( !jobToReplace ) {
                            draft.items.splice( reportedJobIdx, 1 )
                            return;
                        }
                        if( !newJobRef ) {
                            return;
                        }
                        draft.items[reportedJobIdx] = newJobRef as unknown as Job
                    } )
                }
            }
        } )
    }
} )

export default useReportJobMutation
