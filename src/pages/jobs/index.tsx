import React from "react";
import PageContainer from "../../components/shared/PageContainer";
import { useHottestJobQuery, useNewestJobQuery } from "../../graphql";
import withApollo from "../../withApollo";
import { JobSectionList } from "../../components/jobs";
import JobFilter from "../../components/shared/JobFilter";
import { Box } from "@chakra-ui/layout";
import withJobMenuHandler, { WithJobMenuHandlerProps } from "../../components/shared/withJobMenuHandler";

function Jobs( { handleJobMenuClick }: WithJobMenuHandlerProps ) {

    const {
        data: hottestJobResponse,
        loading: loadingHottestJob,
        error: errorHottestJob
    } = useHottestJobQuery()
    const {
        data: newestJobResponse,
        loading: loadingNewestJob,
        error: errorNewestJob
    } = useNewestJobQuery()

    return (
        <PageContainer>
            <JobFilter/>
            <Box px={ 16 } py={ 8 }>
                <JobSectionList
                    error={ errorHottestJob }
                    jobs={ hottestJobResponse?.hottestJob?.items }
                    loading={ loadingHottestJob }
                    section={ "Hottest jobs" }
                    handleJobMenuClick={ handleJobMenuClick }/>
                <JobSectionList
                    error={ errorNewestJob }
                    jobs={ newestJobResponse?.newestJob?.items }
                    loading={ loadingNewestJob }
                    section={ "Newest jobs" }
                    handleJobMenuClick={ handleJobMenuClick }/>
            </Box>
        </PageContainer>
    )
}

export default withApollo( { ssr: true } )( withJobMenuHandler<any>( Jobs ) )
