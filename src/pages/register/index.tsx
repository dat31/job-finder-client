import React from 'react'
import { Field, Form, Formik, FormikErrors, FormikHelpers } from 'formik'
import { Button } from '@chakra-ui/react'
import { mapGqlErrorsToFormikErrors } from "../../utils";
import { useRouter } from "next/router";
import { useRegisterMutation } from "../../graphql";
import withApollo from "../../withApollo";
import { Heading, Stack } from "@chakra-ui/layout";
import { FormikInput } from "../../components/formik-fields";
import FormContainer from "../../components/shared/FormContainer";
import PageContainer from "../../components/shared/PageContainer";
import Link from "next/link";
import { useBlueColorModeValue } from "../../hooks";

type RegisterForm = {
    username: string
    email: string
    password: string
}

function validate( { username, password, email }: RegisterForm ): FormikErrors<RegisterForm> {
    const errors: FormikErrors<RegisterForm> = {}
    if( !username ) {
        errors.username = 'Pls fill username'
    }
    if( !password ) {
        errors.password = 'Pls fill password'
    }
    if( !email ) {
        errors.email = 'Pls fill email'
    }
    if( password.length > 0 && password.length < 6 ) {
        errors.password = 'Password length must be greater than 6'
    }
    return errors
}

function Register() {

    const router = useRouter()
    const [ register ] = useRegisterMutation()

    async function onSubmit(
        inputValues: RegisterForm,
        formikHelper: FormikHelpers<RegisterForm>
    ) {
        const res = await register( { variables: inputValues } )
        const { errors, user } = res.data?.register || {}
        if( errors ) {
            formikHelper.setErrors( mapGqlErrorsToFormikErrors( errors ) || {} )
            return
        }
        if( user ) {
            return router.push( '/' )
        }
    }

    return (
        <PageContainer>
            <FormContainer title={ "Register" }>
                <Formik<RegisterForm>
                    validate={ validate }
                    initialValues={ { username: "", email: "", password: "" } }
                    onSubmit={ onSubmit }>
                    <Form>
                        <Stack spacing={ 4 }>
                            <Field
                                variant="filled"
                                component={ FormikInput }
                                name={ "username" }
                                label={ "Username" }/>
                            <Field
                                variant="filled"
                                component={ FormikInput }
                                name={ "email" }
                                label={ "Email" }/>
                            <Field
                                variant="filled"
                                component={ FormikInput }
                                name={ "password" }
                                label={ "Password" }/>
                        </Stack>
                        <Button colorScheme={ "blue" } w={ "100%" } mt={ 8 } mb={ 6 } type={ "submit" }>
                            Register
                        </Button>
                        <Heading size={ "md" } my={ 4 } textAlign={ "center" } color={ useBlueColorModeValue() }>
                            <Link href={ "/login" }>
                                Already have account? Login
                            </Link>
                        </Heading>
                    </Form>
                </Formik>
            </FormContainer>
        </PageContainer>
    )
}

export default withApollo()( Register )
