import { Field, Form, Formik, FormikErrors, FormikHelpers } from "formik";
import { FormikInput } from "../formik-fields";
import React from "react";
import { Flex, Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { WorkSkill } from "../../types";

type Props = {
    onCancel(): void
    onSubmit( values: WorkSkill, formikHelper: FormikHelpers<WorkSkill> ): Promise<void>
    value: WorkSkill
}

function formValidate( values: WorkSkill ): FormikErrors<WorkSkill> {
    const errors: FormikErrors<WorkSkill> = {}
    const { skill } = values || {}
    if( !skill ) {
        errors.skill = "Skill is required!"
    }
    return errors
}

function WorkSkillForm( { onCancel, value, onSubmit }: Props ) {

    return (
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
                                name={ "skill" }
                                label={ "Skill" }/>
                            <Field
                                component={ FormikInput }
                                name={ "yearOfExperience" }
                                label={ "Year of experience" }/>
                            <Flex mt={ 2 }>
                                <Button
                                    isLoading={ isSubmitting }
                                    children={ "Submit" }
                                    colorScheme={ "blue" }
                                    mr={ 4 }
                                    type={ "submit" }/>
                                <Button children={ "Cancel" } onClick={ onCancel }/>
                            </Flex>
                        </Stack>
                    </Form>
                )
            } }
        </Formik>
    )

}

export default WorkSkillForm
