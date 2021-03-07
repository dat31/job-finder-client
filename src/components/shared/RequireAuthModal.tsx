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
import LoginForm from "./LoginForm";
import { useRouteChangeListener } from "../../hooks";

type RequireAuthModalRef = {
    requireAuthForAction( action: string ): void
}

function RequireAuthModal( {}, ref: Ref<RequireAuthModalRef> ) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ action, setAction ] = React.useState<string>()

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
                    <LoginForm onSuccess={ onClose }/>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export const requireAuthModalRef = React.createRef<RequireAuthModalRef>()

export default React.forwardRef( RequireAuthModal )
