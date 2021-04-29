import PageContainer from "../../components/shared/PageContainer";
import FormContainer from "../../components/shared/FormContainer";
import withApollo from "../../withApollo";
import {
    Avatar,
    useToast
} from "@chakra-ui/react";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React, { Dispatch, Ref, useRef } from "react";
import { ProfileSection, WorkExpForm, Item, WorkSkillForm } from "../../components/profile";
import { BaseEntity, CRUDActions, WorkExperience, WorkSkill } from "../../types";
import {
    useCreateWorkExperienceMutation,
    useCreateWorkSkillMutation,
    useDeleteWorkExperienceMutation,
    useDeleteWorkSkillMutation,
    useProfileQuery,
    useUpdateWorkExperienceMutation,
    useUpdateWorkSkillMutation
} from "../../graphql";
import { FormikHelpers } from "formik";
import ConfirmDeleteDialog, { ConfirmDeleteDialogRef } from "../../components/shared/ConfirmDeleteDialog";
import { omit } from "../../utils/objectUtils";
import { MutationTuple } from "@apollo/client";
import { useColorModeValue } from "@chakra-ui/color-mode";

type RenderSubtitleFn<T> = ( item: T ) => string

function Profile() {

    const { data } = useProfileQuery()

    const [ createWorkExp ] = useCreateWorkExperienceMutation()
    const [ updateWorkExp ] = useUpdateWorkExperienceMutation()
    const [ deleteWorkExp ] = useDeleteWorkExperienceMutation()

    const [ createWorkSkill ] = useCreateWorkSkillMutation()
    const [ updateWorkSkill ] = useUpdateWorkSkillMutation()
    const [ deleteWorkSkill ] = useDeleteWorkSkillMutation()

    const toastSuccess = useToast( {
        isClosable: true,
        status: "success"
    } )
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
        return handleFormSubmit<WorkExperience>(
            values,
            helpers,
            "Work experience",
            () => ( isEdit ? updateWorkExp( mutationOptions ) : createWorkExp( mutationOptions ) )
        )
    }

    function handleWorkSkillFormSubmit( values: WorkSkill, helpers: FormikHelpers<WorkSkill> ) {
        const isEdit = values.id !== undefined
        const mutationOptions = {
            variables: {
                workSkill: omit( {
                    ...values,
                    yearOfExperience: parseInt( ( values.yearOfExperience || 0 ).toString() )
                }, isEdit ? [ "__typename", "userId" ] : undefined ) as WorkSkill
            }
        }
        return handleFormSubmit<WorkSkill>(
            values,
            helpers,
            "Work skill",
            () => ( isEdit ? updateWorkSkill( mutationOptions ) : createWorkSkill( mutationOptions ) ),
        )
    }

    function handleFormSubmit<T extends BaseEntity>(
        values: T,
        helpers: FormikHelpers<T>,
        formType: "Work skill" | "Work experience",
        mutationFn: MutationTuple<any, any>[0],
    ): Promise<any> {
        const isEdit = values.id !== undefined
        return mutationFn()
            .then( () => {
                toastSuccess( {
                    title: `${ formType } has been ${ isEdit ? `updated.` : `created.` }`,
                    description: `${ formType } has been ${ isEdit ? `updated.` : `created.` }`
                } )
                !isEdit && helpers.resetForm()
            } )
            .catch( toastError )
    }

    function handleMenuClick<T extends BaseEntity>(
        item: T,
        deleteMutationFn: MutationTuple<any, any>[0],
        setActiveItemFn: Dispatch<T>
    ) {
        return ( clickedMenu: Exclude<CRUDActions, CRUDActions.CREATE> ) => {
            if( clickedMenu === CRUDActions.EDIT ) {
                setActiveItemFn( item )
            }
            if( clickedMenu === CRUDActions.DELETE ) {
                confirmDeleteDialogRef.current?.open( {
                    onConfirm(): Promise<any> {
                        return deleteMutationFn( { variables: { id: item.id } } )
                    }
                } )
            }
        }
    }

    function renderItem<T extends BaseEntity>(
        titleField: keyof T,
        subtitleField: keyof T | RenderSubtitleFn<T>,
        deleteMutationFn: MutationTuple<any, any>[0]
    ) {
        return ( setActiveItemFn: Dispatch<T> ) => ( item: T ) => (
            <Item
                title={ item[titleField] as unknown as string }
                subtitle={ typeof subtitleField === "function"
                    ? subtitleField( item )
                    : item[subtitleField] as unknown as string
                }
                onMenuClick={ handleMenuClick<T>( item, deleteMutationFn, setActiveItemFn ) }
            />
        )
    }

    function renderWorkSkillSubtitle( { yearOfExperience }: WorkSkill ) {
        return `${ yearOfExperience ? yearOfExperience : "unknown" } year of experience`
    }

    return (
        <PageContainer bgColor={ useColorModeValue( "gray.100", "black" ) }>
            <ConfirmDeleteDialog
                ref={ confirmDeleteDialogRef as Ref<ConfirmDeleteDialogRef> }/>
            <Box minH={ "100vh" }>
                <FormContainer title={ "Profile" } w={ "72vh" }>
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
                        placeholder={ "Filling out 2 or more work experiences will double your chances" +
                        " of being contacted by an employer." }
                        renderItem={ renderItem( "jobTitle", "company", deleteWorkExp ) }/>
                    <ProfileSection<WorkSkill>
                        onSubmit={ handleWorkSkillFormSubmit }
                        renderItem={ renderItem( "skill", renderWorkSkillSubtitle, deleteWorkSkill ) }
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
