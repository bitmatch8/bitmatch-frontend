import styled from "@emotion/styled";
import React, { useMemo } from "react";

interface StyleProp {
  size?: string;
}

export const Spaced: React.FC<StyleProp> = ({
 size=30
}) => {
 
  const sizePx=useMemo(()=>{
    if(String(size).includes('px') === true){
      return size
    }
    return `${size}px`
  },[size])
  return (
   <SpaceSty style={{
    width:sizePx,
    height:sizePx
   }}/> 
  );
};

const SpaceSty = styled.div`
  position: relative;
`;
