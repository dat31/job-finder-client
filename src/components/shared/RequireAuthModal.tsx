import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/hooks";
import React, { Ref } from "react";
import { useRouteChangeListener } from "../../hooks";
import { Button } from "@chakra-ui/button";
import Link from 'next/link'
import { useRouter } from "next/router";

type RequireAuthModalRef = {
    requireAuthForAction( action: string | undefined ): void
}

function RequireAuthModal( {}, ref: Ref<RequireAuthModalRef> ) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ action, setAction ] = React.useState<string>()
    const router = useRouter()

    React.useImperativeHandle( ref, () => ( {
        requireAuthForAction: function( _action ) {
            setAction( _action )
            onOpen()
        },
    } ), [] )

    useRouteChangeListener( onClose )

    return (
        <Modal
            size={ "lg" }
            isCentered
            onClose={ onClose }
            isOpen={ isOpen }
            motionPreset="slideInBottom"
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    You need login to { action || "perform this action" }
                </ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    You need login to { action || "perform this action" }
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme={ "blue" } mr={ 8 }>
                        <Link href={ `/register?redirect=${ router.route }` }>
                            Register
                        </Link>
                    </Button>
                    <Button colorScheme={ "blue" }>
                        <Link href={ `/login?redirect=${ router.route }` }>
                            Login
                        </Link>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export const requireAuthModalRef = React.createRef<RequireAuthModalRef>()

export default React.forwardRef( RequireAuthModal )
