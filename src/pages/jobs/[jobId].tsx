import { useRouter } from "next/router";
import withApollo from "../../withApollo";
import PageContainer from "../../components/shared/PageContainer";
import { useJobLazyQuery, useRelatedJobLazyQuery, useSaveJobMutation } from "../../graphql";
import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { JobSectionList } from "../../components/jobs";
import { FlagIcon, NavigateIcon } from "../../components/icons";
import withJobMenuHandler, { WithJobMenuHandlerProps } from "../../components/shared/withJobMenuHandler";
import { Job, JobMenuEnum } from "../../types";
import { DownloadIcon } from "@chakra-ui/icons";

type JobDetailSectionProps = {
    title: string
    content?: string
}

function JobDetailSection( { title, content }: JobDetailSectionProps ) {
    return (
        <>
            <Heading size={ "md" } mb={ 2 }>
                { title }
            </Heading>
            <Text mb={ 8 }>{ content }</Text>
        </>
    )
}

function JobDetail( { handleJobMenuClick }: WithJobMenuHandlerProps ) {

    const router = useRouter()
    const { jobId } = router.query
    const [ getJobDetail, { data: jobDetail } ] = useJobLazyQuery()
    const [ getRelatedJobs, { data: relatedJobs, loading, error } ] = useRelatedJobLazyQuery()
    const [ , { loading: isLoadingSaveJob } ] = useSaveJobMutation()

    const {
        title,
        description,
        company: { name: companyName = "" } = {},
        salary,
        requirements
    } = jobDetail?.job || {}

    React.useEffect( () => {
        if( !jobId ) {
            return;
        }
        getJobDetail( { variables: { id: parseInt( jobId as string ) } } )
    }, [ jobId, getJobDetail ] )

    React.useEffect( () => {
        if( !jobDetail ) {
            return;
        }
        const { companyId, title: jobCategory, id: currentJobId } = jobDetail?.job || {}
        getRelatedJobs( { variables: { jobCategory, companyId, currentJobId } } )
    }, [ jobDetail, getRelatedJobs ] )

    return (
        <PageContainer>
            <Box m={ 16 }>
                <Flex justifyContent={ "space-between" }>
                    <Heading size={ "lg" } mb={ 2 }>
                        { title }
                    </Heading>
                    <Button colorScheme={ "blue" }>Apply job</Button>
                </Flex>
                <Text>
                    { companyName }
                </Text>
                <Text mb={ 8 }>
                    Application deadline: 12/12/2012
                </Text>
                <JobDetailSection title={ "Salary" } content={ salary }/>
                <JobDetailSection title={ "Description" } content={ description }/>
                <JobDetailSection title={ "Requirements" } content={ requirements }/>
                <Flex>
                    <Button
                        isLoading={ isLoadingSaveJob }
                        leftIcon={ <DownloadIcon color={ "white" }/> }
                        mr={ 4 }
                        colorScheme={ "blue" }>
                        Save this job
                    </Button>
                    <Button leftIcon={ <NavigateIcon color={ "white" }/> } mr={ 4 } colorScheme={ "blue" }>
                        Apply this job
                    </Button>
                    <Button
                        onClick={ () => handleJobMenuClick( JobMenuEnum.REPORT, jobDetail?.job as Job ) }
                        leftIcon={ <FlagIcon/> }>Report this job</Button>
                </Flex>
            </Box>
            <Box mx={ 16 }>
                <JobSectionList
                    jobs={ relatedJobs?.relatedJobs }
                    loading={ loading }
                    error={ error }
                    section={ "Related jobs" }
                    onJobMenuClick={ handleJobMenuClick }
                />
            </Box>
        </PageContainer>
    )
}

export default withApollo( { ssr: true } )( withJobMenuHandler<any>( JobDetail ) )
