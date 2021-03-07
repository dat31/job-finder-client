import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Box
} from "@chakra-ui/react"
import { Button } from "@chakra-ui/button";
import React from "react";

export default function AlertDialogExample( { onClose } ) {
    const cancelRef = React.useRef()

    return (
        <>
            <Box onClick={onClose}>
                    ok

            </Box>
        </>
    )
}