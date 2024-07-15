import { styled } from "@mui/material"
import StarRoundedIcon from '@mui/icons-material/StarRounded';

interface StarMarkProps {
    width: string,
    fillwidth?:string
}

const StarWrapper = styled('div')(
    ({ width }: StarMarkProps) => `
    width: ${width}+px;
    unicode-bidi: bidi-override;
    color: #ccc;
    font-size: 24px;
    position: relative;
    margin: 0;
    padding: 0;
    .fill-ratings {
    color: #e1da06;
    padding: 0;
    position: absolute;
    z-index: 1;
    display: block;
    top: 0;
    left: 0;
    overflow: hidden;
    
    // Allows us to grab the width of the span elements
    span {
        display: inline-flex;        
    }
    }
    .empty-ratings {
    padding: 0;
    display: block;
    z-index: 0;
    color: #aeb0b3;
    }
    `
)

export default function StarMark({width, fillwidth}: StarMarkProps) {

    return (
        <StarWrapper width={width}>
            <div className="fill-ratings" style={{ width: fillwidth+'px' }}>
            <span><StarRoundedIcon /><StarRoundedIcon /><StarRoundedIcon /><StarRoundedIcon /><StarRoundedIcon /></span>
            </div>
            <div className="empty-ratings">
                <span><StarRoundedIcon /><StarRoundedIcon /><StarRoundedIcon /><StarRoundedIcon /><StarRoundedIcon /></span>
            </div>
        </StarWrapper>                
    )
}