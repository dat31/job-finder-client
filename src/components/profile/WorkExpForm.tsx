import { Field, Form, Formik, FormikErrors, FormikHelpers } from "formik";
import { FormikInput } from "../formik-fields";
import React from "react";
import { Box, Flex, Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { WorkExperience } from "../../types";

type Props = {
    onCancel(): void
    onSubmit( values: WorkExperience, formikHelpers: FormikHelpers<WorkExperience> ): Promise<any>
    value: WorkExperience
}

function formValidate( values: WorkExperience ): FormikErrors<WorkExperience> {
    const errors: FormikErrors<WorkExperience> = {}
    const { jobTitle, company } = values || {}
    if( !jobTitle ) {
        errors.jobTitle = "Job title is required!"
    }
    if( !company ) {
        errors.company = "Company name is required!"
    }
    return errors
}

function WorkExpForm( { onCancel, value, onSubmit }: Props ) {

    return (
        <Box my={ 8 }>
            <Formik
                enableReinitialize={ true }
                initialValues={ value }
                onSubmit={ onSubmit }
                validate={ formValidate }>
                { ( { isSubmitting } ) => {
                    return (
                        <Form>
                            <Stack spacing={ 4 }>
                                <Field
                                    component={ FormikInput }
                                    name={ "jobTitle" }
                                    label={ "Job title" }/>
                                <Field
                                    component={ FormikInput }
                                    name={ "company" }
                                    label={ "Company" }/>
                                <Field
                                    type={ "date" }
                                    label={ "From" }
                                    name={ "from" }
                                    component={ FormikInput }/>
                                <Field
                                    type={ "date" }
                                    label={ "To" }
                                    name={ "to" }
                                    component={ FormikInput }/>
                            </Stack>
                            <Flex mt={ 6 }>
                                <Button
                                    isLoading={ isSubmitting }
                                    children={ "Submit" }
                                    colorScheme={ "blue" }
                                    mr={ 4 }
                                    type={ "submit" }/>
                                <Button children={ "Cancel" } onClick={ onCancel }/>
                            </Flex>
                        </Form>
                    )
                } }
            </Formik>
        </Box>
    )

}

export default WorkExpForm
