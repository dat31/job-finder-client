import { Job, JobMenuEnum } from "../../types";
import { ReportJobModal } from "../jobs";
import React, { FunctionComponent, Ref } from "react";
import { ReportJobModalRef } from "../jobs/ReportJobModal";
import { NextPageContext } from "next";
import { useReportJobMutation } from "../../graphql";
import { useRouter } from "next/router";

export interface WithJobMenuHandlerProps {
    handleJobMenuClick( clickedMenu: JobMenuEnum ): void
}

function withJobMenuHandler<P extends WithJobMenuHandlerProps>(
    WrappedComponent: FunctionComponent<P> & { getInitialProps?( context: NextPageContext ): unknown; }
) {

    return function( props: P ) {

        const reportJobModalRef = React.useRef<ReportJobModalRef>()
        const [ reportJob ] = useReportJobMutation()
        const router = useRouter()
        const activeJobId = React.useRef<number | undefined>()

        //TODO: REFACTOR PASS FN TO REPORTJOBMODAL
        function handleReportJobFormSubmit() {
            const jobIdToReport = activeJobId.current
            if( !jobIdToReport ) {
                return
            }
            reportJobModalRef.current?.onLoading()
            reportJob( { variables: { jobId: jobIdToReport } } )
                .then( function( { errors } ) {
                    if( errors ) {
                        //TODO: DISPLAY ERROR
                        return;
                    }
                    if( parseInt( router.query.jobId as string ) === jobIdToReport ) {
                        //TODO: REPLACE
                    }
                    activeJobId.current = undefined
                    reportJobModalRef.current?.onSuccess()
                } )
        }

        function handleJobMenuClick( clickedMenu: JobMenuEnum, jobId: Job["id"] ) {
            switch( clickedMenu ) {
                case JobMenuEnum.REPORT: {
                    reportJobModalRef.current?.onOpen()
                    activeJobId.current = jobId
                    break
                }
                case JobMenuEnum.NOT_INTERESTED: {
                    break
                }
                case JobMenuEnum.SAVE: {
                    break
                }
                default:
                    break
            }
        }

        return (
            <>
                <ReportJobModal
                    onSubmit={ handleReportJobFormSubmit }
                    ref={ reportJobModalRef as Ref<ReportJobModalRef> | undefined }/>
                {/*@ts-ignore*/ }
                <WrappedComponent
                    { ...props as P }
                    handleJobMenuClick={ handleJobMenuClick }/>
            </>
        )
    }
}

export default withJobMenuHandler
