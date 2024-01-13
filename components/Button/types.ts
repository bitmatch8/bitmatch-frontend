import { ElementType, ReactNode } from "react"
import { LayoutProps, SpaceProps } from "styled-system"
import { PolymorphicComponentProps } from "@/utils/polymorphic"

export interface BaseButtonProps extends LayoutProps, SpaceProps {
  as?: "a" | "button" | ElementType
  variant?:'default' | 'secondary' | 'warning',
  to?:string,
  onClick?:any,
  isLoading?: boolean
  disabled?: boolean
  isError?: boolean
}

export type ButtonProps<P extends ElementType = "button"> = PolymorphicComponentProps<P, BaseButtonProps>
