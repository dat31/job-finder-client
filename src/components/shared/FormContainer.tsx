import { SlideFade } from "@chakra-ui/react";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import React from "react";
import { useBgColorModeValue } from "../../hooks";
import { useColorModeValue } from "@chakra-ui/color-mode";

function FormContainer( { children, title }: { children: JSX.Element | JSX.Element[], title?: string } ) {
    return (
        <Flex
            alignItems={ "center" }
            justifyContent={ "center" }
            flexWrap={ "wrap" }>
            <SlideFade in={ true } offsetY="40px">
                <Box
                    minW={ "56vh" }
                    maxW={ "56vh" }
                    m={ 8 }
                    bgColor={ useBgColorModeValue() }
                    p={ 8 }>
                    { title
                        ? <Heading
                            size={ "lg" }
                            color={ useColorModeValue( "blue.500", "blue.200" ) }
                            mb={ 4 }
                            children={ title }/>
                        : null }
                    { children }
                </Box>
            </SlideFade>
        </Flex>
    )
}

export default FormContainer
