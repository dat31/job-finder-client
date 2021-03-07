import { useRouter } from "next/router";
import { useFormik } from "../../../hooks";
import { useLoadPostDetail } from "../../../hooks";
import React, { useCallback } from "react";
import { Input } from "../../../components/formik-fields";
import { Box, Button } from "@chakra-ui/react";
import { useUpdatePostMutation } from "../../../graphql/mutations";

type Form = {
    title?: string
    text?: string
}

function UpdatePost() {

    const route = useRouter()
    const { id: postId } = route.query || {}
    const [ updatePost ] = useUpdatePostMutation()
    const { data: { post: postDetail = {} } = {} } = useLoadPostDetail( postId )
    const { title = '', text = '' } = postDetail

    const formValidator = useCallback( ( inputValues: Form ) => {
        const error: Form = {}
        if ( inputValues.title === title &&
            inputValues.text === text ) {
            error.title = 'what the fuck'
        }
        return error
    }, [ title, text ] )

    const onSubmit = useCallback( ( inputValues: Form ) => (
        updatePost( {
            variables: {
                ...inputValues,
                id: parseInt( postId as string )
            }
        } )
    ), [ updatePost, postId ] )

    const {
        handleSubmit,
        isSubmitting,
        getFieldProps,
    } = useFormik( {
        initialValues: { title, text },
        enableReinitialize: true,
        onSubmit,
        validate: formValidator
    } )

    return (
        <Box p={ 6 }>
            <form onSubmit={ handleSubmit }>
                <Input
                    label={ 'Title' }
                    { ...getFieldProps( "title" ) }/>
                <Input
                    label={ 'Text' }
                    { ...getFieldProps( "text" ) }/>
                <Button
                    loadingText={ 'Updating' }
                    isLoading={ isSubmitting }
                    mt={ 4 }
                    type={ "submit" }
                    children={ 'Update post' }
                    colorScheme={ 'blue' }/>
            </form>
        </Box>
    )
}

export default UpdatePost
