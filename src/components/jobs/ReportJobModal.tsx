import React, { Ref } from "react";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Checkbox,
    Textarea
} from "@chakra-ui/react"
import { Stack } from "@chakra-ui/layout";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from "@chakra-ui/react"

export type ReportJobModalRef = {
    onOpen(): void
    onClose(): void
    onLoading(): void
    onSuccess(): void
}

type Props = {
    onSubmit(): void,
}

const reasonCheckBoxes = [
    "It is offensive, discriminatory",
    "It seems like a fake job",
    "It is inaccurate",
    "It is an advertisement",
    "Other"
]

const VALID_REPORT_ADDITIONAL_INFO_LENGTH = 20

function ReportJobModal(
    { onSubmit }: Props,
    ref: Ref<ReportJobModalRef>
) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ additionalInformation, setAdditionalInformation ] = React.useState<string>( "" )
    const [ reportReasons, setReportReasons ] = React.useState<string[]>( [] )
    const [ { isLoading = false, isSuccess = false } = {}, setCallAPIState ] =
        React.useState<{ isLoading?: boolean, isSuccess?: boolean } | undefined>()

    React.useImperativeHandle( ref, () => ( {
        onOpen,
        onClose,
        onLoading: function() {
            setCallAPIState( { isLoading: true } )
        },
        onSuccess: function() {
            console.log( "ON SUCCESS CALLED" )
            setCallAPIState( { isSuccess: true, isLoading: false } )
        }
    } ), [] )

    React.useEffect( () => {
        return function() {
            setAdditionalInformation( "" )
            setReportReasons( [] )
            setCallAPIState( undefined )
        }
    }, [ isOpen ] )

    function handleAdditionalInfoChange( evt: React.ChangeEvent<HTMLTextAreaElement> ): void {
        setAdditionalInformation( evt.target.value )
    }

    function handleReportReasonCheck( evt: React.ChangeEvent<HTMLInputElement> ): void {
        const { name, checked } = evt.target
        setReportReasons( prevState => {
            if( checked ) {
                return prevState.includes( name )
                    ? prevState.filter( r => r !== name )
                    : [ ...prevState, name ]
            }
            return prevState.filter( r => r !== name )
        } )
    }

    const enableSubmit = (
        additionalInformation?.length > VALID_REPORT_ADDITIONAL_INFO_LENGTH ||
        reportReasons.length > 0
    )

    return (
        <Modal
            size={ "xl" }
            isCentered
            onClose={ onClose }
            isOpen={ isOpen }
            motionPreset="slideInBottom"
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Report Job</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    {
                        isSuccess
                            ? ( <Alert
                                p={ 4 }
                                my={ 2 }
                                status="success"
                                variant="solid"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                textAlign="center">
                                <AlertIcon boxSize="40px" mr={ 0 } mt={ 2 }/>
                                <AlertTitle mt={ 8 } mb={ 2 } fontSize="xl">
                                    Job successfully reported !
                                </AlertTitle>
                                <AlertDescription maxWidth="sm">
                                    Now you won't see this job anymore.
                                    Thank you for helping us identify suspicious behavior on FINDER.
                                </AlertDescription>
                            </Alert> )
                            : ( <>
                                <Stack mb={ 8 } spacing={ 4 }>
                                    { reasonCheckBoxes.map( ( reason, idx ) => (
                                        <Checkbox
                                            isChecked={ reportReasons.includes( reason ) }
                                            name={ reason }
                                            onChange={ handleReportReasonCheck }
                                            children={ reason }
                                            key={ idx }/>
                                    ) ) }
                                </Stack>
                                <Textarea
                                    borderRadius={ "0" }
                                    onChange={ handleAdditionalInfoChange }
                                    placeholder={ `Additional information (at least ${ VALID_REPORT_ADDITIONAL_INFO_LENGTH } character)` }
                                    variant="filled"
                                />
                            </> )
                    }
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" mr={ 3 } onClick={ onClose }>
                        Close
                    </Button>
                    {
                        isSuccess
                            ? null
                            : <Button
                                colorScheme="blue"
                                disabled={ !enableSubmit || isLoading || isSuccess }
                                onClick={ () => onSubmit() }>
                                Submit
                            </Button>
                    }
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default React.forwardRef( ReportJobModal )
