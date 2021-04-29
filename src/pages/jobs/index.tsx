import React from "react";
import PageContainer from "../../components/shared/PageContainer";
import { useHottestCategoriesQuery, useHottestJobQuery, useNewestJobQuery } from "../../graphql";
import withApollo from "../../withApollo";
import { JobSectionList } from "../../components/jobs";
import Filter from "../../components/shared/Filter";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import withJobMenuHandler, { WithJobMenuHandlerProps } from "../../components/shared/withJobMenuHandler";
import { Image, SimpleGrid } from "@chakra-ui/react";
import { useBgColorModeValue, useBlueColorModeValue } from "../../hooks";
import { useColorModeValue } from "@chakra-ui/color-mode";

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
    const {
        data: hottestCategoriesRes
    } = useHottestCategoriesQuery()

    return (
        <PageContainer>
            <Flex bgColor={ useBgColorModeValue() }>
                <Flex flex={ 2 } w={ "100%" } alignItems={ "center" }>
                    <Filter
                        inputPlaceholder={ "Job title, keywords" }
                        subtitle={ "Explore 1000+ jobs on FINDER" }
                        title={ "Find your dream jobs" }/>
                </Flex>
                <Box flex={ 3 }>
                    { useColorModeValue( <Image src={ "/images/6308.jpg" }/>, null ) }
                </Box>
            </Flex>
            <Box px={ 16 } py={ 8 }>
                <JobSectionList
                    error={ errorHottestJob }
                    jobs={ hottestJobResponse?.hottestJob }
                    loading={ loadingHottestJob }
                    section={ "Hottest jobs" }
                    onJobMenuClick={ handleJobMenuClick }/>
                <JobSectionList
                    error={ errorNewestJob }
                    jobs={ newestJobResponse?.newestJob }
                    loading={ loadingNewestJob }
                    section={ "Newest jobs" }
                    onJobMenuClick={ handleJobMenuClick }/>
                <Heading
                    color={ useBlueColorModeValue() }
                    size={ "lg" }
                    mb={ 4 }>
                    Top categories
                </Heading>
                <SimpleGrid columns={ 6 } spacing={ 8 }>
                    { hottestCategoriesRes?.hottestCategories.map( ( category, idx ) => (
                        <Box
                            bgColor={ useColorModeValue( "gray.100", "black" ) }
                            p={ 6 }
                            key={ idx }>
                            <Flex justifyContent={ "center" } alignItems={ "center" } flexDir={ "column" }>
                                <Heading size={ "md" } mb={ 2 } children={ category.title }/>
                                <Text children={ category.numberOfJobs }/>
                            </Flex>
                        </Box>
                    ) ) }
                </SimpleGrid>
            </Box>
        </PageContainer>
    )
}

export default withApollo( { ssr: true } )( withJobMenuHandler<any>( Jobs ) )
