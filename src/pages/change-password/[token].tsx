import { Alert, AlertIcon, Box, Button, Link } from '@chakra-ui/react';
import React, { useState } from "react";
import { useChangePasswordMutation } from "../../graphql/mutations";
import { mapGqlErrorsToFormikErrors } from "../../utils";
import { useRouter } from "next/router";
import { Field, Form, Formik, FormikErrors, FormikHelpers } from "formik";
import { FormikInput } from "../../components/formik-fields";
import { FieldErrors } from "../../types";
import withApollo from "../../withApollo";
import PageContainer from "../../components/shared/PageContainer";
import FormContainer from "../../components/shared/FormContainer";

type ChangePasswordForm = {
    newPassword: string
    confirmNewPassword: string
}

function validate( { newPassword, confirmNewPassword }: ChangePasswordForm ): FormikErrors<ChangePasswordForm> {
    const errors: FormikErrors<ChangePasswordForm> = {}
    if( !newPassword ) {
        errors.newPassword = 'New password is required!'
    }
    if( !confirmNewPassword ) {
        errors.confirmNewPassword = 'Confirm new password is required!'
    }
    if( newPassword?.length > 0 &&
        confirmNewPassword?.length > 0 &&
        newPassword !== confirmNewPassword ) {
        errors.confirmNewPassword = 'Password does not match!'
    }
    return errors
}

function ChangePassword() {

    const router = useRouter()
    const [ tokenError, setTokenError ] = useState<string | undefined>()
    const { token = '' } = router.query
    const [ changePassword ] = useChangePasswordMutation()

    async function onSubmit(
        inputValues: ChangePasswordForm,
        { setErrors }: FormikHelpers<ChangePasswordForm>
    ) {
        const res = await changePassword( {
            variables: {
                token, newPassword:
                inputValues.newPassword
            }
        } )
        const { errors } = res.data.changePassword
        if( !errors ) {
            return router.push( '/' )
        }
        const tokenEr = ( errors as FieldErrors ).find( ( er ) => er.field === 'token' )
        if( tokenEr ) {
            return setTokenError( tokenEr.message )
        }
        if( errors ) {
            return setErrors( mapGqlErrorsToFormikErrors( errors ) || {} )
        }
        return router.push( '/' )
    }

    return (
        <PageContainer>
            <FormContainer title={ "Change password" }>
                { tokenError
                    ? ( <Alert status="error" my={ 4 } variant={ 'solid' }>
                        <AlertIcon/>
                        { tokenError }
                        <Box ml={ 3 }>
                            <Link href={ '/forgot-password' }>
                                Try again
                            </Link>
                        </Box>
                    </Alert> )
                    : ( <Formik<ChangePasswordForm>
                        validate={ validate }
                        initialValues={ { newPassword: "", confirmNewPassword: "" } }
                        onSubmit={ onSubmit }>
                        { ( { isSubmitting } ) => (
                            <Form>
                                <Field
                                    disabled={ isSubmitting }
                                    variant="filled"
                                    component={ FormikInput }
                                    name={ "newPassword" }
                                    label={ "New password" }/>
                                <Field
                                    disabled={ isSubmitting }
                                    variant="filled"
                                    component={ FormikInput }
                                    name={ "confirmNewPassword" }
                                    label={ "Confirm new password" }/>
                                <Button
                                    isLoading={ isSubmitting }
                                    colorScheme={ "blue" }
                                    w={ "100%" }
                                    mt={ 8 }
                                    mb={ 6 }
                                    type={ "submit" }>
                                    Submit
                                </Button>
                            </Form>
                        ) }
                    </Formik> ) }
            </FormContainer>
        </PageContainer>
    )
}

export default withApollo()( ChangePassword )
