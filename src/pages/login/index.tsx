import { useCurrentUserQuery, useLoginMutation, useLogoutMutation } from "../../graphql";
import { useRouter } from "next/router";
import withApollo from "../../withApollo";
import React from "react";
import { Text } from "@chakra-ui/react"
import FormContainer from "../../components/shared/FormContainer";
import PageContainer from "../../components/shared/PageContainer";
import { Link as ChakraLink } from "@chakra-ui/react"
import { Field, Form, Formik, FormikErrors, FormikHelpers } from "formik";
import { Box, Heading, Stack } from "@chakra-ui/layout";
import { FormikInput } from "../../components/formik-fields";
import { Button } from "@chakra-ui/button";
import NextLink from "next/link";
import { mapGqlErrorsToFormikErrors } from "../../utils";
import { useColorModeValue } from "@chakra-ui/color-mode";

type LoginFormValues = {
    usernameOrEmail: string
    password: string
}

function validate( inputValues: LoginFormValues ): FormikErrors<LoginFormValues> {
    const error: FormikErrors<LoginFormValues> = {}
    const { usernameOrEmail, password } = inputValues
    if( !usernameOrEmail ) {
        error.usernameOrEmail = "Username or email is required!"
    }
    if( !password ) {
        error.password = "Password is required!"
    }
    return error
}

function Login() {

    const router = useRouter()
    const { data } = useCurrentUserQuery()
    const [ logout, { loading: isLoadingLogout } ] = useLogoutMutation()
    const [ login ] = useLoginMutation()

    async function onSubmit( inputValues: LoginFormValues, { setErrors }: FormikHelpers<LoginFormValues> ) {
        const res = await login( { variables: inputValues } )
        const { errors } = res?.data?.login || {}
        if( errors ) {
            setErrors( mapGqlErrorsToFormikErrors( errors ) || {} )
            return
        }
        const { redirect } = router.query
        router.push( typeof redirect === 'string' ? redirect : '/' ).then()
    }

    return (
        <PageContainer bgColor={ useColorModeValue( "gray.100", "black" ) }>
            <Box minH={ "100vh" }>
                <FormContainer title={ "Login" }>
                    {
                        data?.currentUser
                            ? <>
                                <Text>You are already login</Text>
                                { isLoadingLogout
                                    ? <Text>Logging out...</Text>
                                    : <ChakraLink onClick={ () => logout() }>
                                        <Text>Click here to login another account</Text>
                                    </ChakraLink>
                                }
                            </>
                            : <Formik<LoginFormValues>
                                validate={ validate }
                                initialValues={ { usernameOrEmail: "", password: "" } }
                                onSubmit={ onSubmit }>
                                { ( { isSubmitting } ) => (
                                    <Form>
                                        <Stack spacing={ 4 }>
                                            <Field
                                                variant="filled"
                                                component={ FormikInput }
                                                name={ "usernameOrEmail" }
                                                label={ "Email address (or username)" }/>
                                            <Field
                                                variant="filled"
                                                component={ FormikInput }
                                                name={ "password" }
                                                label={ "Password" }/>
                                        </Stack>
                                        <Button
                                            isLoading={ isSubmitting }
                                            disabled={ isSubmitting }
                                            colorScheme={ "blue" }
                                            w={ "100%" }
                                            mt={ 8 }
                                            mb={ 6 }
                                            type={ "submit" }>
                                            Sign in
                                        </Button>
                                        <Heading size={ "md" } my={ 4 } textAlign={ "center" } color={ "blue.500" }>
                                            <NextLink href={ "/register" }>
                                                New to FINDER? Create an account
                                            </NextLink>
                                        </Heading>
                                        <Text textAlign={ "center" } mt={ 4 } color={ "gray.500" }>
                                            By signing in to your account, you agree to Finder's Terms of Service and
                                            consent to
                                            our
                                            Cookie Policy and Privacy Policy.
                                        </Text>
                                        <Text mt={ 4 } textAlign={ "center" } color={ "blue.500" }>
                                            <NextLink href={ "/forgot-password" }>
                                                Forgot password
                                            </NextLink>
                                        </Text>
                                    </Form>
                                ) }
                            </Formik>
                    }
                </FormContainer>
            </Box>
        </PageContainer>
    )
}

export default withApollo()( Login )
