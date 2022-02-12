import React from "react";

import "./FormInput.scss"

interface IProps{
    id: string,
    label: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    type: string,
    value: string,
    name: string,
    required?: boolean,
}

const FormInput: React.FunctionComponent<IProps> = ({id, label, onChange, ...otherProps}) => {

    return <div className="group">
        <label className={`${otherProps.value.length ? "shrink" : ""} form-input-label`} htmlFor={id} >{label}</label>
        <input className="form-input" id={id} onChange={onChange} {...otherProps}/>
    </div>
}

export default FormInput;