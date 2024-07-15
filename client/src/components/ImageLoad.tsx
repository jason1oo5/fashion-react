import React, { useState } from "react";
import { EvoTypography } from "./styled-components";

interface ImageLoadProps {
    src: string,
    width: string
}

const ImageLoad = ({src, width}: ImageLoadProps) => {
    const [loadingState, setLoadingState] = useState(false);

    return (
        <React.Fragment>
        {loadingState?
            <EvoTypography color='white'>Loading</EvoTypography>
            :
            <img
                src={src}
                width={width}
                height="auto"
                alt={`showcase img ${src}`}
                onLoad={ () => setLoadingState(false) }
            />
        }
        </React.Fragment>
    )
}

export default ImageLoad;