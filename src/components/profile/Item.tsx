import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { CRUDActions } from "../../types";
import ItemMenu from "./ItemMenu";

type Props = {
    title: string,
    subtitle: string,
    onMenuClick( clickedMenu: Exclude<CRUDActions, CRUDActions.CREATE> ): void
}

function Item( { title, subtitle, onMenuClick }: Props ) {
    return (
        <Flex justifyContent={ "space-between" } alignItems={ "center" }>
            <Box py={ 2 }>
                <Text>{ title }</Text>
                <Text color={ "gray.500" }>{ subtitle }</Text>
            </Box>
            <ItemMenu onClick={ onMenuClick }/>
        </Flex>
    )
}

export default Item
