import styled from "@emotion/styled"
import CircleLoader from "./CircleLoader"
import React from "react"

const LoaderBox: React.FC<{ loading?: boolean;className?:string, children: any }> = ({
  className,
  loading,
  children,
}) => {
  return (
    <LoaderBoxSty className={className}>
      {/* {loading ?<LoadingIconBox>
        <LoadingIcon />
      </LoadingIconBox>:''} */}

      {children}
    </LoaderBoxSty>
  )
}
const LoaderBoxSty = styled.div<{ loading?: boolean }>`
  position: relative;
`

export default LoaderBox

const LoadingIconBox = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

const LoadingIcon = styled.div`
  @keyframes animloader7 {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
  position: absolute;
  top: 20%;
  left: 50%;
  transform:translateY(-50%);
  z-index: 10;
  width: 48px;
  height: 48px;
  display: inline-block;
  position: relative;
  &::after,
  &::before {
    content: "";
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid #fff;
    position: absolute;
    left: 0;
    top: 0;
    -webkit-animation: animloader7 2s linear infinite;
    animation: animloader7 2s linear infinite;
  }
  &::after {
    -webkit-animation-delay: 1s;
    animation-delay: 1s;
  }
  &::after,
  &::before {
    content: "";
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid #fff;
    position: absolute;
    left: 0;
    top: 0;
    -webkit-animation: animloader7 2s linear infinite;
    animation: animloader7 2s linear infinite;
  }
`
