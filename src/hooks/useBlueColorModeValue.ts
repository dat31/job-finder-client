import { useColorModeValue } from "@chakra-ui/color-mode";

function useBlueColorModeValue(): "blue.500" | "blue.200" {
    return useColorModeValue( "blue.500", "blue.200" )
}

export default useBlueColorModeValue
