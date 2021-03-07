import React from "react";
import { FieldInputProps, FieldProps, FormikProps } from "formik";
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from "@chakra-ui/react";

interface CustomInputProps {
    type?: HTMLInputElement["type"];
    field: FieldInputProps<any>,
    form: FormikProps<any>,
    label: string
    helperText?: string
    disabled?: boolean
}

function FormikInput( props: CustomInputProps & FieldProps ) {
    const {
        helperText,
        label,
        field: { name, value = "" },
        form: { errors, handleChange, handleBlur, isSubmitting },
        type
    } = props

    const error = errors[name]

    return (
        <FormControl isInvalid={ error !== undefined }>
            <FormLabel htmlFor={ name } children={ label } color={ "gray.500" }/>
            <Input
                name={ name }
                onBlur={ handleBlur }
                onChange={ handleChange }
                value={ value }
                id={ name }
                type={ type }
                variant={ "filled" }
                disabled={ isSubmitting }
            />
            { error !== undefined ? <FormErrorMessage children={ error }/> : null }
            { ( helperText && !error ) ? <FormHelperText children={ helperText }/> : null }
        </FormControl>
    )

}

export default FormikInput
