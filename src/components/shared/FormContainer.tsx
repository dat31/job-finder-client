import { SlideFade } from "@chakra-ui/react";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import React from "react";
import { useBgColorModeValue, useBlueColorModeValue } from "../../hooks";

type Props = {
    children: JSX.Element | JSX.Element[],
    title?: string,
    w?: string
}

function FormContainer( { children, title, w = "56vh" }: Props ) {
    return (
        <Flex
            alignItems={ "center" }
            justifyContent={ "center" }
            flexWrap={ "wrap" }>
            <SlideFade in={ true } offsetY="40px">
                <Box
                    w={ w }
                    m={ 8 }
                    bgColor={ useBgColorModeValue() }
                    p={ 8 }>
                    { title
                        ? <Heading
                            size={ "lg" }
                            color={ useBlueColorModeValue() }
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
