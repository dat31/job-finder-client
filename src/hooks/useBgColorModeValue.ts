import { useColorModeValue } from "@chakra-ui/color-mode";

function useBgColorModeValue(): "white" | "black" {
    return useColorModeValue( "white", "black" )
}

export default useBgColorModeValue
