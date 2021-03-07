import { useForgotPasswordMutation } from "../../graphql/mutations";
import { Button, Text } from '@chakra-ui/react'
import { FormikInput } from "../../components/formik-fields";
import React from "react";
import withApollo from "../../withApollo";
import { Field, Form, Formik, FormikErrors, FormikHelpers, FormikProps } from "formik";
import PageContainer from "../../components/shared/PageContainer";
import FormContainer from "../../components/shared/FormContainer";

type ForgotPwForm = {
    email?: string
}

function validate( inputValues: ForgotPwForm ): FormikErrors<ForgotPwForm> {
    if( !inputValues.email ) {
        return { email: "Email is required!" }
    }
    return {}
}

function ForgotPassword() {

    const [ sendEmailForgotPw ] = useForgotPasswordMutation()

    async function onSubmit( inputValues: ForgotPwForm, { setStatus }: FormikHelpers<ForgotPwForm> ) {
        await sendEmailForgotPw( { variables: { email: inputValues.email } } )
        setStatus( { isSuccess: true } )
    }

    function renderForm( {
                             values: { email },
                             status: { isSuccess } = {},
                             isSubmitting
                         }: FormikProps<ForgotPwForm> ) {

        if( isSuccess ) {
            return ( <>
                <Text>We have sent an email to { email }. Check your email and follow the instruction.</Text>
                <Text>Don't receive email? Resend</Text>
            </> )
        }

        return ( <>
            <Text mb={ 4 } color={ "gray.500" }>
                Please enter your email or username, you will receive a link to create new password via email
            </Text>
            <Form>
                <Field
                    disabled={ isSubmitting }
                    variant="filled"
                    component={ FormikInput }
                    name={ "email" }
                    label={ "Email or username" }/>
                <Button isLoading={ isSubmitting } colorScheme={ "blue" } w={ "100%" } mt={ 8 } mb={ 6 }
                        type={ "submit" }>
                    Submit
                </Button>
            </Form>
        </> )
    }

    return (
        <PageContainer>
            <FormContainer title={ "Forgot password" }>
                <Formik<ForgotPwForm>
                    validate={ validate }
                    initialValues={ { email: "", } }
                    onSubmit={ onSubmit }>
                    { renderForm }
                </Formik>
            </FormContainer>
        </PageContainer>

    )
}

export default withApollo()( ForgotPassword )
