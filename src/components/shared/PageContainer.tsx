import NavBar from "../nav-bar";
import { Box } from "@chakra-ui/layout";
import React from "react";
import { Footer } from "../Footer";

type Props = {
    children: JSX.Element | JSX.Element[]
}

function PageContainer( { children }: Props ) {

    return (
        <>
            <NavBar/>
            <Box children={ children }/>
            <Footer/>
        </>
    )

}

export default PageContainer
