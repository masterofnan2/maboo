import React from "react";

type CustomProps = {
    options?: {
        error?: string,
    }
}

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = React.memo((props: InputProps & CustomProps) => {
    const { options, className = '', ...inputProps } = props;

    return <>
        <input
            {...inputProps}
            className={`form-control ${className} ${options?.error && 'is-invalid'}`} />
        {options?.error &&
            <p className="invalid-feedback">{options.error}</p>}
    </>
});

export default Input;