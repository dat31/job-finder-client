import { FieldErrors } from "../types";

function mapErrors( errors: FieldErrors | undefined ) {
    if( !errors ) {
        return undefined
    }
    return errors.reduce( ( err, { field, message } ) => ( {
        ...err,
        [field]: message
    } ), {} )
}

export default mapErrors
