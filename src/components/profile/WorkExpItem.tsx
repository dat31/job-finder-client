import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { CRUDActions, WorkExperience } from "../../types";
import ItemMenu from "./ItemMenu";

type Props = {
    workExp: WorkExperience
    onMenuClick( clickedMenu: Exclude<CRUDActions, CRUDActions.CREATE> ): void
}

function WorkExpItem( { workExp, onMenuClick }: Props ) {
    return (
        <Flex justifyContent={ "space-between" } alignItems={ "center" }>
            <Box py={ 2 } key={ workExp.id }>
                <Text>{ workExp.jobTitle }</Text>
                <Text color={ "gray.500" }>{ workExp.company }</Text>
            </Box>
            <ItemMenu onClick={ onMenuClick }/>
        </Flex>
    )
}

export default WorkExpItem
