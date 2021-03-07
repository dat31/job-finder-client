import { Job, JobMenuEnum } from "../../types";
import React from "react";
import { Box, Flex, GridItem, Heading, Text } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";
import Link from 'next/link'
import { useRouter } from "next/router";
import JobItemMenu from "./JobItemMenu";

type JobItemProps = {
    job: Job
    onMenuClick( menu: JobMenuEnum ): void
}

function JobItem( { job, onMenuClick }: JobItemProps ) {
    const { title, id, description, company, salary } = job
    const bgColor = useColorModeValue( "white", "black" )
    const router = useRouter()
    if( !id ) {
        return null
    }

    return (
        <GridItem
            cursor={ "pointer" }
            id={ id.toString() }
            overflow={ "hidden" }
            bgColor={ bgColor }>
            <Box p={ 6 }>
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
                    <JobItemMenu onClick={ onMenuClick } jobId={ id }/>
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
