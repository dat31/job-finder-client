import React, { ReactNode } from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    Stack,
    Heading, useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, UnlockIcon } from '@chakra-ui/icons';
import { useCurrentUserQuery } from "../../graphql/queries";
import { useLogoutMutation } from "../../graphql";
import { DarkModeSwitch } from "../DarkModeSwitch";
import NextLink from 'next/link'
import { useRouter } from "next/router";
import { useBlueColorModeValue } from "../../hooks";

const links = [
    { href: "/jobs", label: "Find jobs" },
    { href: "/company-reviews", label: "Company Reviews" }
];

function NavLink( { children, href }: { children: ReactNode, href: string } ) {
    return (
        <Heading px={ 2 } size={ "sm" } color={ useBlueColorModeValue() }>
            <NextLink href={ href }>
                { children }
            </NextLink>
        </Heading>
    )
}

function NavBar() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data } = useCurrentUserQuery()
    const [ logout ] = useLogoutMutation()
    const router = useRouter()

    function renderNavRight() {
        if( data?.currentUser ) {
            return (
                <Menu>
                    <MenuButton
                        as={ Button }
                        rounded={ 'full' }
                        variant={ 'link' }
                        cursor={ 'pointer' }>
                        <Avatar size={ 'sm' }/>
                    </MenuButton>
                    <Heading
                        size={ "sm" }
                        ml={ 2 }
                        children={ data?.currentUser.username }/>
                    <MenuList>
                        <MenuItem>My Jobs</MenuItem>
                        <MenuItem>My Reviews</MenuItem>
                        <MenuItem onClick={ () => router.push( "/profile" ) }>Profile</MenuItem>
                        <MenuDivider/>
                        <MenuItem onClick={ () => logout() } icon={ <UnlockIcon/> }>
                            Logout
                        </MenuItem>
                    </MenuList>
                </Menu>
            )
        }
        return (
            <>
                <NavLink href={ "/register" }>
                    Register
                </NavLink>
                <NavLink href={ "/login" }>
                    Login
                </NavLink>
            </>
        )
    }

    function renderLink() {
        return links.map( ( link ) => (
            <NavLink key={ link.href } href={ link.href }>
                { link.label }
            </NavLink>
        ) )
    }

    return (
        <Box
            bgColor={ useColorModeValue( "white", "black" ) }
            zIndex={ 2 }
            width={ '100%' }
            py={ 2 }
            px={ {
                md: 16,
                sm: 8,
            } }>
            <Flex h={ 16 } alignItems={ 'center' } justifyContent={ 'space-between' }>
                <IconButton
                    size={ 'md' }
                    icon={ isOpen ? <CloseIcon/> : <HamburgerIcon/> }
                    aria-label={ 'Open Menu' }
                    display={ { md: !isOpen ? 'none' : 'inherit' } }
                    onClick={ isOpen ? onClose : onOpen }
                />
                <HStack spacing={ 8 } alignItems={ 'center' }>
                    <Heading
                        cursor={ "pointer" }
                        size={ "lg" }>
                        <NextLink href={ "/" }>
                            FINDER
                        </NextLink>
                    </Heading>
                    <HStack
                        as={ 'nav' }
                        spacing={ 4 }
                        display={ { base: 'none', md: 'flex' } }>
                        { renderLink() }
                    </HStack>
                </HStack>
                <HStack as={ 'nav' } spacing={ 4 }>
                    { renderNavRight() }
                    <DarkModeSwitch/>
                </HStack>
            </Flex>
            { isOpen ? (
                <Box pb={ 4 }>
                    <Stack as={ 'nav' } spacing={ 4 }>
                        { renderLink() }
                    </Stack>
                </Box>
            ) : null }
        </Box>
    );
}

export default NavBar
