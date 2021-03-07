import { useRouter } from "next/router";
import withApollo from "../../withApollo";
import PageContainer from "../../components/shared/PageContainer";
import JobFilter from "../../components/shared/JobFilter";
import { useJobLazyQuery, useRelatedJobLazyQuery } from "../../graphql";
import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { JobSectionList } from "../../components/jobs";
import { FlagIcon, NavigateIcon } from "../../components/icons";
import withJobMenuHandler, { WithJobMenuHandlerProps } from "../../components/shared/withJobMenuHandler";
import { JobMenuEnum } from "../../types";
import { useBgColorModeValue } from "../../hooks";

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
            <Text mb={ 4 }>{ content }</Text>
        </>
    )
}

function JobDetail( { handleJobMenuClick }: WithJobMenuHandlerProps ) {

    const router = useRouter()
    const { jobId } = router.query
    const [ getJobDetail, { data: jobDetail } ] = useJobLazyQuery()
    const [ getRelatedJobs, { data: relatedJobs, loading, error } ] = useRelatedJobLazyQuery()
    const {
        title,
        description,
        company: { name: companyName = "" } = {},
        salary,
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
            <JobFilter/>
            <Box p={ 8 } mx={ 16 } mt={ 16 } mb={ 8 } bgColor={ useBgColorModeValue() }>
                <Flex justifyContent={ "space-between" }>
                    <Heading size={ "lg" } mb={ 2 }>
                        { title }
                    </Heading>
                    <Button colorScheme={ "blue" }>Apply job</Button>
                </Flex>
                <Text>
                    { companyName }
                </Text>
                <Text mb={ 4 }>
                    Application deadline: 12/12/2012
                </Text>
                <JobDetailSection title={ "Salary" } content={ salary }/>
                <JobDetailSection title={ "Description" } content={ description }/>
                <JobDetailSection title={ "Requirements" } content={ description }/>
                <Flex>
                    <Button leftIcon={ <NavigateIcon color={ "white" }/> } mr={ 4 } colorScheme={ "blue" }>
                        Apply this job
                    </Button>
                    <Button
                        onClick={ () => handleJobMenuClick( "Report Job" as JobMenuEnum ) }
                        leftIcon={ <FlagIcon/> }>Report this job</Button>
                </Flex>
            </Box>
            <Box mx={ 16 }>
                <JobSectionList
                    jobs={ relatedJobs?.relatedJobs?.items }
                    loading={ loading }
                    error={ error }
                    section={ "Related jobs" }
                    handleJobMenuClick={ handleJobMenuClick }
                />
            </Box>
        </PageContainer>
    )
}

export default withApollo( { ssr: true } )( withJobMenuHandler<any>( JobDetail ) )
