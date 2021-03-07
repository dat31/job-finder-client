import { Box, Heading } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Input, InputGroup, InputLeftElement, VStack } from "@chakra-ui/react";
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
            pl={ 16 }
            py={ 24 }>
            <Heading mb={ 2 } color={ useColorModeValue( "blue.500", "blue.200" ) }>
                Find your dream jobs
            </Heading>
            <Heading mb={ 6 } size={ "md" }>Explore 1000+ jobs on FINDER</Heading>
            <VStack spacing={ 4 } justifyContent={ "flex-end" }>
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
                <Button
                    ml={ "auto" }
                    colorScheme={ "blue" }
                    px={ 12 }
                    leftIcon={ <SearchIcon/> }
                    flexGrow={ 1 }>
                    Find job
                </Button>
            </VStack>
        </Box>
    )

}

export default JobFilter
