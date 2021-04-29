import { Flex, Heading, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { IconProps, RepeatIcon } from "@chakra-ui/icons";
import { ComponentWithAs } from "@chakra-ui/react";
import { ReactElement } from "react";

type Props = {
    retry(): Promise<any>
    Icon: ComponentWithAs<"svg", IconProps> | ReactElement | any
    title?: string,
    subtitle?: string
}

function ErrorPlaceholder( {
                               retry,
                               Icon,
                               title = "An error occurred",
                               subtitle = "Cannot load data. Try again later"
                           }: Props ) {

    function renderIcon() {
        if( typeof Icon === "object" ) {
            return <Icon boxSize={ 32 } mb={ 8 }/>
        }
        if( typeof Icon === "function" ) {
            return Icon()
        }
        return null
    }

    return (
        <Flex
            textAlign={ "center" }
            m={ "auto" }
            maxW={ "20rem" }
            color={ "gray.500" }
            direction={ "column" }
            justifyContent={ "center" }
            alignItems={ "center" }>
            { renderIcon() }
            <Heading size={ "md" } mb={ 2 }>{ title }</Heading>
            <Text mb={ 4 }>{ subtitle }</Text>
            <Button
                onClick={ retry }
                leftIcon={ <RepeatIcon/> }
                px={ 8 }
                colorScheme={ "blue" }>
                Retry
            </Button>
        </Flex>
    )

}

export default ErrorPlaceholder
