import { Box, Heading } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { HStack, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { LocationIcon } from "../icons";
import { Button } from "@chakra-ui/button";
import React, { ChangeEvent } from "react";

type FilterCondition = {
    keyword?: string
    location?: string
}

function JobFilter() {

    const [ , setFilterCondition ] = React.useState<FilterCondition>( {} )

    function handleFilterChange( evt: ChangeEvent<HTMLInputElement> ): void {
        const { name, value } = evt.target
        setFilterCondition( prevState => ( {
            ...prevState,
            [name]: value
        } ) )
    }

    return (
        <Box
            bgColor={ useColorModeValue( "white", "black" ) }
            px={ 16 }
            py={ 24 }>
            <Heading mb={ 2 } color={ useColorModeValue( "blue.500", "blue.200" ) }>
                Find your dream jobs
            </Heading>
            <Heading mb={ 6 } size={ "md" }>Explore 1000+ jobs on FINDER</Heading>
            <HStack spacing={ 8 }>
                <InputGroup>
                    <InputLeftElement
                        onChange={ handleFilterChange }
                        pointerEvents="none"
                        children={ <SearchIcon color="gray.300"/> }
                    />
                    <Input
                        variant={ "filled" }
                        placeholder="Job title, keywords"/>
                </InputGroup>
                <InputGroup>
                    <InputLeftElement
                        onChange={ handleFilterChange }

                        pointerEvents="none"
                        children={ <LocationIcon color="gray.300"/> }
                    />
                    <Input
                        variant={ "filled" }
                        placeholder="City or province"/>
                </InputGroup>
                <Button colorScheme={ "blue" } px={ 12 } leftIcon={ <SearchIcon/> } flexGrow={ 1 }>
                    Find job
                </Button>
            </HStack>
        </Box>
    )

}

export default JobFilter
