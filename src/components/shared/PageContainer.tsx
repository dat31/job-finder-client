import NavBar from "../nav-bar";
import { Box } from "@chakra-ui/layout";
import React from "react";
import { Footer } from "../Footer";
import { Token } from "@chakra-ui/styled-system/dist/types/utils";
import * as CSS from "csstype";

type Props = {
    children: JSX.Element | JSX.Element[],
    bgColor?: Token<CSS.Property.Color, "colors">
}

function PageContainer( { children, bgColor }: Props ) {

    return (
        <>
            <NavBar/>
            <Box children={ children } bgColor={ bgColor }/>
            <Footer/>
        </>
    )

}

export default PageContainer
