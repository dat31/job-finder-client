import PageContainer from "../../components/shared/PageContainer";
import { Box, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/layout";
import { useBgColorModeValue, useBlueColorModeValue } from "../../hooks";
import Filter from "../../components/shared/Filter";
import { Avatar, Image } from "@chakra-ui/react";
import React from "react";
import withApollo from "../../withApollo";
import { useColorModeValue } from "@chakra-ui/color-mode";

function CompanyReviews() {
    return (
        <PageContainer>
            <Flex bgColor={ useBgColorModeValue() }>
                <Box flex={ 2 }>
                    <Filter
                        inputPlaceholder={ "Enter a company name" }
                        subtitle={ "Discover millions of company reviews" }
                        title={ "Find great places to work" }/>
                </Box>
                <Box flex={ 3 }>
                    <Image src={ "/images/6308.jpg" }/>
                </Box>
            </Flex>
            <Box px={ 16 } py={ 8 }>
                <Heading
                    color={ useBlueColorModeValue() }
                    size={ "lg" }
                    mb={ 4 }>
                    { "Popular companies" }
                </Heading>
                <Grid templateColumns="repeat(3, .5fr)" gap={ 8 } mb={ 8 }>
                    <GridItem bgColor={ useColorModeValue( "gray.100", "black" ) } p={ 6 }>
                        <Flex>
                            <Avatar mr={ 8 }/>
                            <Box>
                                <Heading size={ "md" } noOfLines={ 1 } mb={ 2 }>
                                    { "title" }
                                </Heading>
                                <Text>
                                    asdasd
                                </Text>
                            </Box>
                        </Flex>
                    </GridItem>
                    <GridItem bgColor={ useColorModeValue( "gray.100", "black" ) } p={ 6 }>
                        <Flex>
                            <Avatar mr={ 8 }/>
                            <Box>
                                <Heading size={ "md" } noOfLines={ 1 } mb={ 2 }>
                                    { "title" }
                                </Heading>
                                <Text>
                                    asdasd
                                </Text>
                            </Box>
                        </Flex>
                    </GridItem>
                    <GridItem bgColor={ useColorModeValue( "gray.100", "black" ) } p={ 6 }>
                        <Flex>
                            <Avatar mr={ 8 }/>
                            <Box>
                                <Heading size={ "md" } noOfLines={ 1 } mb={ 2 }>
                                    { "title" }
                                </Heading>
                                <Text>
                                    asdasd
                                </Text>
                            </Box>
                        </Flex>
                    </GridItem>
                </Grid>
            </Box>
        </PageContainer>
    )
}

export default withApollo()( CompanyReviews )
