import { Box, Flex, Grid, GridItem, Heading } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";
import React from "react";
import { generateArray } from "../../utils/arrayUtils";
import JobItem from "./JobItem";
import { Job, JobMenuEnum } from "../../types";
import { QueryResult } from "@apollo/client";

type Props = {
    jobs: Job[] | undefined
    loading: QueryResult["loading"],
    error: QueryResult["error"],
    section: string
    onJobMenuClick( clickedMenu: JobMenuEnum, job: Job ): void
}

function JobSectionList( {
                             error,
                             jobs,
                             loading,
                             section,
                             onJobMenuClick
                         }: Props ) {

    const itemBgColor = useColorModeValue( "white", "black" )
    const headingColor = useColorModeValue( "blue.500", "white" )

    function renderJobs() {
        if( loading ) {
            return generateArray( 6 ).map( k => (
                <GridItem key={ k } bgColor={ itemBgColor }>
                    <Flex p={ 6 }>
                        <Box h={ 24 } w={ 24 } mr={ 6 } bgColor={ "gray.200" }/>
                        <Box flexGrow={ 1 }>
                            <Box h={ 6 } w={ "30%" } bgColor={ "gray.200" } mb={ 2 }/>
                            <Box h={ 16 } w={ "100%" } bgColor={ "gray.200" }/>
                        </Box>
                    </Flex>
                </GridItem> ) )
        }
        if( error ) {
            return "SOME THING WENT WRONG!"
        }
        if( jobs?.length === 0 ) {
            return `There is no ${ section }`
        }
        if( !jobs ) {
            return
        }
        return jobs.map( job => (
            <JobItem
                key={ job.id }
                job={ job }
                onMenuClick={ onJobMenuClick }/>
        ) )
    }

    return (
        <>
            <Heading
                color={ headingColor }
                size={ "lg" }
                mb={ 4 }>
                { section }
            </Heading>
            <Grid templateColumns="repeat(3, .5fr)" gap={ 8 } mb={ 8 }>
                { renderJobs() }
            </Grid>
        </>
    )

}

export default JobSectionList
