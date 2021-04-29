function inProps<T>( key: string, props: Array<keyof T> ) {
    return props.some( ( omitKey ) => omitKey === key )
}

export function omit<T>( obj: T, props: Array<keyof T> | undefined ): Omit<T, keyof T> {
    if( !props ) return obj
    const newObj: Omit<T, keyof T> = {} as T;
    Object.keys( obj ).forEach( ( key ) => {
        if( !inProps<T>( key, props ) ) {
            ( newObj as any )[key] = obj[key as keyof T];
        }
    } );
    return newObj;
}
