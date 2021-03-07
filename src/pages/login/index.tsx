import { useCurrentUserQuery, useLogoutMutation } from "../../graphql";
import { useRouter } from "next/router";
import withApollo from "../../withApollo";
import React from "react";
import { Text } from "@chakra-ui/react"
import FormContainer from "../../components/shared/FormContainer";
import PageContainer from "../../components/shared/PageContainer";
import { Link as ChakraLink } from "@chakra-ui/react"
import LoginForm from "../../components/shared/LoginForm";

function Login() {

    const router = useRouter()
    const { data } = useCurrentUserQuery()
    const [ logout, { loading: isLoadingLogout } ] = useLogoutMutation()

    function onLoginSuccess() {
        const { redirect } = router.query
        router.push( typeof redirect === 'string' ? redirect : '/' ).then()
    }

    return (
        <PageContainer>
            <FormContainer title={ "Login" }>
                {
                    data?.me
                        ? <>
                            <Text>You are already login</Text>
                            { isLoadingLogout
                                ? <Text>Logging out...</Text>
                                : <ChakraLink onClick={ () => logout() }>
                                    <Text>Click here to login another account</Text>
                                </ChakraLink>
                            }
                        </>
                        : <LoginForm onSuccess={ onLoginSuccess }/>
                }
            </FormContainer>
        </PageContainer>
    )
}

export default withApollo()( Login )
