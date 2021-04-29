import { Box, Heading } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Input, InputGroup, InputLeftElement, Flex } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { ChangeEvent } from "react";

type FilterCondition = {
    keyword?: string
}

type Props = {
    title: string
    subtitle: string
    inputPlaceholder: string
}

function Filter( { title, subtitle, inputPlaceholder }: Props ) {

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
            w={ "100%" }
            bgColor={ useColorModeValue( "white", "black" ) }
            pl={ 16 }
            py={ 24 }>
            <Heading mb={ 2 } color={ useColorModeValue( "blue.500", "blue.200" ) }>
                { title }
            </Heading>
            <Heading mb={ 6 } size={ "md" }>{ subtitle }</Heading>
            <Flex justifyContent={ "center" } alignItems={ "center" }>
                <InputGroup>
                    <InputLeftElement
                        onChange={ handleFilterChange }
                        pointerEvents="none"
                        children={ <SearchIcon color="gray.300"/> }
                    />
                    <Input
                        variant={ "filled" }
                        placeholder={ inputPlaceholder }/>
                </InputGroup>
            </Flex>
        </Box>
    )

}

export default Filter
