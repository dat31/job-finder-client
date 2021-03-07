import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import theme from '../theme'
import { Container } from "../components/Container";
import React from "react";
import RequireAuthModal, { requireAuthModalRef } from "../components/shared/RequireAuthModal";

type AppProps = {
    Component: any,
    pageProps: any,
}

function MyApp( { Component, pageProps }: AppProps ) {

    return (
        <ChakraProvider resetCSS theme={ theme }>
            <ColorModeProvider
                options={ {
                    // useSystemColorMode: true,
                } }
            >
                <Container>
                    <Component { ...pageProps } />
                    <RequireAuthModal ref={ requireAuthModalRef }/>
                </Container>
            </ColorModeProvider>
        </ChakraProvider>
    )
}

export default MyApp
