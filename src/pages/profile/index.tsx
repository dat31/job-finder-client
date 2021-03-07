import PageContainer from "../../components/shared/PageContainer";
import FormContainer from "../../components/shared/FormContainer";
import withApollo from "../../withApollo";
import {
    Avatar,
    useToast
} from "@chakra-ui/react";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React, { Dispatch, Ref, useRef } from "react";
import { ProfileSection, WorkExpForm, WorkExpItem, WorkSkillForm } from "../../components/profile";
import { CRUDActions, WorkExperience, WorkSkill } from "../../types";
import {
    useCreateWorkExperienceMutation,
    useCreateWorkSkillMutation,
    useDeleteWorkExperienceMutation,
    useProfileQuery, useUpdateWorkExperienceMutation
} from "../../graphql";
import { FormikHelpers } from "formik";
import ConfirmDeleteDialog, { ConfirmDeleteDialogRef } from "../../components/shared/ConfirmDeleteDialog";
import { omit } from "../../utils/objectUtils";

function Profile() {

    const { data } = useProfileQuery()
    const [ createWorkExp ] = useCreateWorkExperienceMutation()
    const [ updateWorkExp ] = useUpdateWorkExperienceMutation()
    const [ deleteWorkExp ] = useDeleteWorkExperienceMutation()
    const [ createWorkSkill ] = useCreateWorkSkillMutation()

    const toastSuccess = useToast( { isClosable: true, status: "success" } )
    const toastError = useToast( {
        isClosable: true,
        status: "error",
        title: "An error occurred.",
        description: "Please try again later.",
    } )

    const confirmDeleteDialogRef = useRef<ConfirmDeleteDialogRef>()
    const {
        workExperiences = [],
        workSkills = []
    } = data?.profile || {}

    function handleWorkExpFormSubmit( values: WorkExperience, helpers: FormikHelpers<WorkExperience> ) {
        const isEdit = values.id !== undefined
        const mutationOptions = {
            variables: {
                workExperience: isEdit
                    ? omit( values, [ "__typename", "userId" ] ) as WorkExperience
                    : values
            }
        };
        return ( values.id !== undefined
            ? updateWorkExp( mutationOptions )
            : createWorkExp( mutationOptions ) )
            .then( () => {
                toastSuccess( {
                    title: "Work experience created.",
                    description: "Work experience created.",
                } )
                !isEdit && helpers.resetForm()
            } )
            .catch( toastError )
    }

    function handleWorkSkillFormSubmit( values: WorkSkill, helpers: FormikHelpers<WorkSkill> ) {
        return createWorkSkill( {
            variables: {
                workSkill: {
                    ...values,
                    yearOfExperience: parseInt( ( values.yearOfExperience || 0 ).toString() )
                }
            }
        } )
            .then( () => {
                toastSuccess( {
                    title: "Work skill created",
                    description: "Work skill created"
                } )
                helpers.resetForm()
            } )
            .catch( toastError )
    }

    function renderWorkExpItem( setActiveItemFn: Dispatch<any> ) {
        return ( workExp: WorkExperience ) => (
            <WorkExpItem
                key={ workExp.id }
                workExp={ workExp }
                onMenuClick={ clickedMenu => {
                    if( clickedMenu === CRUDActions.EDIT ) {
                        setActiveItemFn( workExp )
                    }
                    if( clickedMenu === CRUDActions.DELETE ) {
                        confirmDeleteDialogRef.current?.open( {
                            header: "kakakkaaa",
                            onConfirm(): Promise<any> {
                                return deleteWorkExp( { variables: { id: workExp.id } } )
                            }
                        } )
                    }
                } }/>
        )
    }

    return (
        <PageContainer>
            <ConfirmDeleteDialog
                ref={ confirmDeleteDialogRef as Ref<ConfirmDeleteDialogRef> }/>
            <Box minH={ "100vh" }>
                <FormContainer title={ "Profile" }>
                    <Flex mb={ 8 }>
                        <Avatar/>
                        <Box ml={ 8 }>
                            <Heading size={ "md" }>Your name</Heading>
                            <Text>Your location</Text>
                        </Box>
                    </Flex>
                    <ProfileSection<WorkExperience>
                        onSubmit={ handleWorkExpFormSubmit }
                        items={ workExperiences }
                        CrudForm={ WorkExpForm as any }
                        type={ "Work experiences" }
                        placeholder={ "Filling out 2 or more work experiences will double your chances of being contacted by an employer." }
                        renderItem={ renderWorkExpItem }/>
                    <ProfileSection<WorkSkill>
                        onSubmit={ handleWorkSkillFormSubmit }
                        renderItem={ () => () => <></> }
                        items={ workSkills }
                        CrudForm={ WorkSkillForm as any }
                        placeholder={ "Your skills" }
                        type={ "Skills" }/>
                </FormContainer>
            </Box>
        </PageContainer>
    )
}

export default withApollo()( Profile )
