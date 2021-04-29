import { Box, useColorMode } from '@chakra-ui/react'

export const Container = ( props ) => {

    const { colorMode } = useColorMode()
    const bgColor = { light: 'white', dark: 'gray.900' }
    const color = { light: 'gray.700', dark: 'white' }

    return (
        <Box
            minH={ '100vh' }
            bg={ bgColor[colorMode] }
            color={ color[colorMode] }
            { ...props }
        />
    )
}
