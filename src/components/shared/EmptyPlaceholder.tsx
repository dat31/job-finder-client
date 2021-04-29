import { Flex, Heading, Text } from "@chakra-ui/layout";
import { IconProps, Search2Icon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/button";
import { ComponentWithAs } from "@chakra-ui/react";
import { ReactElement } from "react";

type Props = {
    title: string
    subtitle: string
    button: string,
    Icon: ComponentWithAs<"svg", IconProps> | ReactElement | any
}

function EmptyPlaceholder( { title, subtitle, button, Icon }: Props ) {

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
                leftIcon={ <Search2Icon/> }
                px={ 8 }
                colorScheme={ "blue" }>
                { button }
            </Button>
        </Flex>
    )
}

export default EmptyPlaceholder
