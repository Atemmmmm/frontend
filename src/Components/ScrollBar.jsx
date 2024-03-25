import React, {memo} from "react";
import styled from "styled-components";

const StyledScrollBar = styled.div`
    overflow-x: scroll;

    &::-webkit-scrollbar{
        width: 8px;
        height: 8px;
        border-radius: 6px;
        background: rgba(255,255,255,0.4)
        
    }

    &::-webkit-scrollbar-thumb{
        background: #ccc;
        border-radius: 6px;
    }
`
export const ScrollBar = memo(pros => {
    const {children} = pros;
    return <StyledScrollBar>{children}</StyledScrollBar>
})