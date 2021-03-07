import React from "react";
import { Router } from "next/router";

function useRouteChangeListener( fn: Function ) {

    const fnRef = React.useRef<Function>()

    React.useEffect( function() {
        fnRef.current = fn
    }, [ fn ] )

    React.useEffect( function() {
        Router.events.on( "routeChangeStart", function() {
            if( typeof fnRef.current === "function" ) {
                fnRef.current()
            }
        } )
    }, [] )
}

export default useRouteChangeListener
