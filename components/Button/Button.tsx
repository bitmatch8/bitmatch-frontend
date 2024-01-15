import { ElementType } from "react";
import StyledButton from "./StyledButton";
import { ButtonProps, } from "./types";
import CircleLoader from "components/Loader/CircleLoader";

const Button = <E extends ElementType = "button">(props: ButtonProps<E>): JSX.Element => {
  const { startIcon, endIcon, external, className,to, isLoading,isError, disabled, children, ...rest } = props;
  const isDisabled = isLoading || disabled;
  const classNames = className ? [className] : [];
  
  const as = to ? 'a':'buton'
  if (isLoading) {
    classNames.push("button--loading");
  }

  if (isDisabled ) {
    classNames.push("button--disabled");
  }

  if (isError) {
    classNames.push("button--error");
  }

  return (
    <StyledButton
      as={as}
      href={to}
      isError={isError}
      $isLoading={disabled}
      className={classNames.join(" ")}
      disabled={isDisabled}
      {...rest}
    >
      <>
        {isLoading ? <CircleLoader />:''}
        {children}
      </>
    </StyledButton>
  );
};


export default Button;
