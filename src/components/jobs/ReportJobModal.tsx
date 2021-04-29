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
import { useReportJobMutation } from "../../graphql";
import { Job } from "../../types";

export type ReportJobModalRef = {
    open( jobId: Job["id"] ): void
}

type Props = {}

const reasonCheckBoxes = [
    "It is offensive, discriminatory",
    "It seems like a fake job",
    "It is inaccurate",
    "It is an advertisement",
    "Other"
]

const VALID_REPORT_ADDITIONAL_INFO_LENGTH = 20

function ReportJobModal(
    {}: Props,
    ref: Ref<ReportJobModalRef>
) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ additionalInformation, setAdditionalInformation ] = React.useState<string>( "" )
    const [ reportReasons, setReportReasons ] = React.useState<string[]>( [] )
    const [ jobId, setJobId ] = React.useState<number | undefined>()
    const [ reportJob, { loading } ] = useReportJobMutation(  )
    const [ isSuccess, setIsSuccess ] = React.useState<boolean>( false )

    React.useImperativeHandle( ref, () => ( {
        open( id: Job["id"] ) {
            setJobId( id )
        },
        onClose,
    } ), [] )

    React.useEffect( () => {
        return function() {
            setAdditionalInformation( "" )
            setReportReasons( [] )
            setIsSuccess( false )
        }
    }, [ isOpen ] )

    React.useEffect( () => {
        if( jobId ) {
            onOpen()
        }
    }, [ jobId, onOpen ] )

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

    function onSubmit() {
        reportJob( { variables: { jobId } } )
            .then( ( { data } ) => {
                if( !data ) {
                    return
                }
                setIsSuccess( true )
                setJobId( undefined )
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
                                disabled={ !enableSubmit || loading || isSuccess }
                                onClick={ onSubmit }>
                                Submit
                            </Button>
                    }
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default React.forwardRef( ReportJobModal )
