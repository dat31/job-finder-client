import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter, Alert, AlertIcon,
} from "@chakra-ui/react"
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import React, { Ref } from "react";
import { Checkbox } from "@chakra-ui/react"

type DialogConfig = {
    header?: string
    body?: string
    onConfirm?(): Promise<any>
}

export type ConfirmDeleteDialogRef = {
    open( config?: DialogConfig ): void
}

function ErrorAlert() {
    return (
        <Alert status="error" variant="left-accent">
            <AlertIcon/>
            An error occurred. Please try again
        </Alert>
    )
}

function ConfirmDeleteDialog( {}, ref: Ref<ConfirmDeleteDialogRef> ) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ { header, body, onConfirm }, setDialogConfig ] = React.useState<DialogConfig>( {
        header: "Confirm action",
        body: " Are you sure? You can't undo this action afterwards.",
        onConfirm: () => Promise.resolve()
    } )
    const [ isLoading, setIsLoading ] = React.useState<boolean>()
    const [ isError, setIsError ] = React.useState<boolean>()

    React.useImperativeHandle( ref, () => ( {
        open: function( config ) {
            if( config ) {
                setDialogConfig( prevState => ( { ...prevState, ...config } ) )
            }
            onOpen()
        }
    } ), [] )

    React.useEffect( () => setIsError( false ), [ isOpen ] )

    function handleConfirm() {
        if( !onConfirm ) {
            return;
        }
        setIsLoading( true )
        onConfirm()
            .then( onClose )
            .catch( () => setIsError( true ) )
            .finally( () => setIsLoading( false ) )
    }

    return (
        <Modal
            motionPreset="slideInBottom"
            isCentered={ 1 + 1 === 2 }
            isOpen={ isOpen }
            onClose={ onClose }>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader children={ header }/>
                <ModalCloseButton/>
                <ModalBody>
                    { isError
                        ? <ErrorAlert/>
                        : <>
                            { body }
                            <Checkbox mt={ 4 }>Dont ask again</Checkbox>
                        </> }
                </ModalBody>
                <ModalFooter>
                    <Button onClick={ onClose }>
                        Cancel
                    </Button>
                    <Button
                        isLoading={ isLoading }
                        colorScheme="red"
                        onClick={ handleConfirm }
                        ml={ 3 }>
                        { isError ? "Retry" : "Delete" }
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default React.forwardRef( ConfirmDeleteDialog )
