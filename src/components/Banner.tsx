import { Img } from "@chakra-ui/react";
import React from "react";

function Banner() {
    return (
        <Img
            objectFit={ 'cover' }
            maxH={ 520 }
            w={ '100%' }
            src={ "/images/banner.jpg" }/>
    )
}

export default Banner
