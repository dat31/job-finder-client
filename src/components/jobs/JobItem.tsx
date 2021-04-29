import { Job, JobMenuEnum } from "../../types";
import React from "react";
import { Box, Flex, GridItem, Heading, Text } from "@chakra-ui/layout";
import Link from 'next/link'
import { useRouter } from "next/router";
import JobItemMenu from "./JobItemMenu";
import { useColorModeValue } from "@chakra-ui/color-mode";

type JobItemProps = {
    job: Job
    onMenuClick( clickedMenu: JobMenuEnum, job: Job ): void
}

function JobItem( { job, onMenuClick }: JobItemProps ) {

    const { title, id, description, company, salary, hasBeenSaved } = job
    const router = useRouter()

    if( !id ) {
        return null
    }

    return (
        <GridItem
            p={ 6 }
            cursor={ "pointer" }
            id={ id.toString() }
            overflow={ "hidden" }
            bgColor={ useColorModeValue( "gray.100", "black" ) }>
            <Box>
                <Flex
                    justifyContent={ "space-between" }
                    alignItems={ "center" }>
                    <Link
                        as={ `/jobs/${ id }` }
                        href={ '/jobs/[jobId]' }
                        replace={ router.query.jobId !== undefined }>
                        <Box flexGrow={ 1 }>
                            <Heading size={ "sm" } mb={ 2 }>
                                { company.name }
                            </Heading>
                            <Heading size={ "md" } noOfLines={ 1 }>
                                { title }
                            </Heading>
                        </Box>
                    </Link>
                    <JobItemMenu
                        hasBeenSaved={ hasBeenSaved }
                        onClick={ clickedMenu => onMenuClick( clickedMenu, job ) }
                        jobId={ id }/>
                </Flex>
                <Link
                    as={ `/jobs/${ id }` }
                    href={ '/jobs/[jobId]' }
                    replace={ router.query.jobId !== undefined }>
                    <Box>
                        <Text mb={ 2 } color={ "blue.600" }>
                            { salary }
                        </Text>
                        <Text color={ "gray.500" } noOfLines={ 2 }>
                            { description }
                        </Text>
                    </Box>
                </Link>
            </Box>
        </GridItem>
    )
}

export default JobItem
