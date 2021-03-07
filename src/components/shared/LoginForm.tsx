import { Field, Form, Formik, FormikErrors, FormikHelpers } from "formik";
import { Heading, Stack } from "@chakra-ui/layout";
import { FormikInput } from "../formik-fields";
import { Button } from "@chakra-ui/button";
import React from "react";
import NextLink from "next/link";
import { Text } from "@chakra-ui/react";
import { mapErrors } from "../../utils";
import { useLoginMutation } from "../../graphql";

type LoginFormValues = {
    usernameOrEmail: string
    password: string
}

type LoginFormProps = {
    onSuccess?(): void
    onError?(): void
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

function LoginForm( { onError, onSuccess }: LoginFormProps ) {

    const [ login ] = useLoginMutation()

    async function onSubmit( inputValues: LoginFormValues, { setErrors }: FormikHelpers<LoginFormValues> ) {
        const res = await login( { variables: inputValues } )
        const { user, errors } = res?.data?.login || {}
        if( user && typeof onSuccess === "function" ) {
            onSuccess()
            return
        }
        setErrors( mapErrors( errors ) || {} )
        if( typeof onError !== "function" ) {
            return;
        }
        onError()
    }

    return (
        <Formik<LoginFormValues>
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
                        By signing in to your account, you agree to Finder's Terms of Service and consent to
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
    )
}

export default LoginForm
