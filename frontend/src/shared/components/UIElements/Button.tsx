import React from "react";

import "./Button.scss"

interface IProps{
    id: string,
    type?: "button" | "submit" | "reset",
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    isBlueStyle?: boolean,
    inverted?: boolean,
}

const Button : React.FunctionComponent<IProps> = ({id, isBlueStyle, inverted, children, ...otherProps}) => {
    return (
        <button className= {`${inverted ? "inverted" : ""} ${isBlueStyle ? "blue-style" : ""} custom-button`} id={id} {...otherProps}>{children}</button>
    );
}

export default Button;