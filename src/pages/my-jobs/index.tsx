import withApollo from "../../withApollo";
import {
    EmptyPlaceholder,
    ErrorPlaceholder,
    FormContainer,
    PageContainer,
    withJobMenuHandler
} from "../../components/shared";
import { Box, Heading, Stack } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Tabs, TabList, TabPanels, Tab as CRTab, TabPanel } from "@chakra-ui/react"
import { useBlueColorModeValue } from "../../hooks";
import { WithJobMenuHandlerProps } from "../../components/shared/withJobMenuHandler";
import { ArrowForwardIcon, DownloadIcon } from "@chakra-ui/icons";
import { useMyJobsQuery } from "../../graphql";
import React, { ReactElement } from "react";
import { generateArray } from "../../utils/arrayUtils";
import { Job } from "../../types";
import { JobItem } from "../../components/jobs";

function Tab( { children, badge }: { children: string, badge: number } ) {
    return (
        <CRTab
            color={ "gray.500" }
            pl={ 0 }
            _selected={ {
                color: useBlueColorModeValue()
            } }>
            <Heading size={ "md" }>{ children }</Heading>
            <Heading bgColor={ "gray.100" } p={ 1 } px={ 2 } borderRadius={ "sm" } size={ "sm" } ml={ 2 }>
                { badge }
            </Heading>
        </CRTab>
    )
}

function JobPendingItem() {
    return (
        <Box>
            <Box h={ 6 } w={ "30%" } bgColor={ "gray.200" } mb={ 2 }/>
            <Box h={ 16 } w={ "100%" } bgColor={ "gray.200" }/>
        </Box>
    )
}

function MyJobs( { handleJobMenuClick }: WithJobMenuHandlerProps ) {

    const { data, loading, error, refetch } = useMyJobsQuery()

    function renderJobs( jobs: Job[], EmptyComponent: ReactElement, ErrorIcon: any ) {
        if( loading ) {
            return <Stack
                spacing={ 8 }
                children={ generateArray( 3 ).map(
                    ( k ) => ( <JobPendingItem key={ k }/> ) ) }/>
        }
        if( error ) {
            return <ErrorPlaceholder retry={ refetch } Icon={ ErrorIcon }/>
        }
        if( jobs?.length === 0 ) {
            return EmptyComponent
        }
        return <Stack spacing={ 8 }>
            { jobs.map(
                ( job ) => <JobItem job={ job } key={ job.id } onMenuClick={ handleJobMenuClick }/> ) }
        </Stack>
    }

    return (
        <PageContainer bgColor={ useColorModeValue( "gray.100", "black" ) }>
            <Box minH={ "100vh" }>
                <FormContainer title={ "My jobs" } w={ "72vh" }>
                    <Tabs variant={ "unstyled" }>
                        <TabList>
                            <Tab badge={ 0 }>Saved jobs</Tab>
                            <Tab badge={ 0 }>Applied jobs</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel px={ 0 } py={ 8 }>
                                { renderJobs(
                                    data?.myJobs?.savedJobs || [],
                                    <EmptyPlaceholder
                                        Icon={ DownloadIcon }
                                        button={ "Find jobs" }
                                        title={ "No jobs saved yet" }
                                        subtitle={ "Jobs you choose to save during a job search will be shown here." }/>,
                                    DownloadIcon ) }
                            </TabPanel>
                            <TabPanel>
                                { renderJobs(
                                    data?.myJobs?.appliedJobs || [],
                                    <EmptyPlaceholder
                                        Icon={ ArrowForwardIcon }
                                        button={ "Find jobs" }
                                        title={ "No applications yet" }
                                        subtitle={ "Once you apply to jobs, you can track the status of the applications here." }/>,
                                    DownloadIcon ) }
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </FormContainer>
            </Box>
        </PageContainer>
    )
}

export default withApollo()( withJobMenuHandler<any>( MyJobs ) )
