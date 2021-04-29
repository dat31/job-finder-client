import { Job, JobMenuEnum } from "../../types";
import { ReportJobModal } from "../jobs";
import React, { FunctionComponent, Ref } from "react";
import { ReportJobModalRef } from "../jobs/ReportJobModal";
import { NextPageContext } from "next";
import { useSaveJobMutation } from "../../graphql";
import { useToast } from "@chakra-ui/react";

export interface WithJobMenuHandlerProps {
    handleJobMenuClick( clickedMenu: JobMenuEnum, job: Job ): void
}

function withJobMenuHandler<P extends WithJobMenuHandlerProps>(
    WrappedComponent: FunctionComponent<P> & { getInitialProps?( context: NextPageContext ): unknown; }
) {

    return function( props: P ) {

        const reportJobModalRef = React.useRef<ReportJobModalRef>()
        const [ saveJob ] = useSaveJobMutation()
        const toast = useToast()

        function handleJobMenuClick( clickedMenu: JobMenuEnum, job: Job ) {
            if( !job.id ) {
                return
            }
            switch( clickedMenu ) {
                case JobMenuEnum.REPORT: {
                    reportJobModalRef.current?.open( job.id )
                    break
                }
                case JobMenuEnum.NOT_INTERESTED: {
                    break
                }
                case JobMenuEnum.SAVE: {
                    saveJob( { variables: { jobId: job.id } } )
                        .then( () => toast( {
                            status: "success",
                            title: `Job has been ${ job.hasBeenSaved ? `removed` : `saved` }`,
                            isClosable: true
                        } ) )
                    break;
                }
                default:
                    break
            }
        }

        return (
            <>
                <ReportJobModal ref={ reportJobModalRef as Ref<ReportJobModalRef> | undefined }/>
                {/*@ts-ignore*/ }
                <WrappedComponent
                    { ...props as P }
                    handleJobMenuClick={ handleJobMenuClick }/>
            </>
        )
    }
}

export default withJobMenuHandler
