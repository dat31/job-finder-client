export function generateArray( length: number ): any[] {
    if( !length ) return []
    return Array.from( new Array( length ).keys() )
}
