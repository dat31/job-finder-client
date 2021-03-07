import React, { Dispatch, ReactElement } from "react";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/button";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { Collapse } from "@chakra-ui/react";
import { FormikHelpers } from "formik";

type CrudFormProps<T> = {
    onCancel(): void
    value: T | undefined | {}
    onSubmit( values: T, formikHelpers: FormikHelpers<T> ): Promise<any>

}

type Props<T> = {
    placeholder: string
    type: "Work experiences" | "Skills"
    CrudForm: ( { onCancel, value }: CrudFormProps<T> ) => ReactElement
    items: T[]
    renderItem: ( clickHandler: Dispatch<any> ) => ( item: T, index?: number, arr?: T[] ) => void
    onSubmit( values: T, formikHelpers: FormikHelpers<T> ): Promise<any>

}

function DetailSection<T>( {
                               placeholder,
                               type,
                               CrudForm,
                               items,
                               renderItem,
                               onSubmit,
                           }: Props<T> ) {

    const [ activeItem, setActiveItem ] = React.useState<T | undefined | {}>()

    function onAddEditBtnClick(): void {
        setActiveItem( prevState => prevState === undefined ? {} : undefined )
    }

    function onCancelBtnClick(): void {
        setActiveItem( undefined )
    }

    return (
        <Box mb={ 8 }>
            <Flex justifyContent={ "space-between" } alignItems={ "center" } mb={ 2 }>
                <Heading size={ "md" }>{ type }</Heading>
                <IconButton
                    onClick={ onAddEditBtnClick }
                    aria-label={ "add" }
                    icon={ activeItem ? <CloseIcon/> : <AddIcon/> }
                    variant={ "ghost" }
                    colorScheme={ "blue" }/>
            </Flex>
            <Collapse in={ activeItem === undefined || items.length > 0 }>
                { items.length === 0
                    ? ( <>
                        <Text color={ "gray.400" } mb={ 2 }>{ placeholder }</Text>
                        <Button colorScheme={ "blue" } onClick={ onAddEditBtnClick }>
                            Add { type.toLowerCase() }
                        </Button>
                    </> )
                    : <Stack spacing={ 2 } children={ items.map( renderItem( setActiveItem ) ) }/>
                }
            </Collapse>
            <Collapse in={ activeItem !== undefined }>
                <CrudForm
                    onSubmit={ onSubmit }
                    onCancel={ onCancelBtnClick }
                    value={ activeItem }/>
            </Collapse>
        </Box>
    )
}

export default DetailSection
