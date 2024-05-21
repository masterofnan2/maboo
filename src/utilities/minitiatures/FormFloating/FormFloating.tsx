import React from "react";
import getElementProps from "../../helpers/getElementProps";

type Props = {
    label: string | React.JSX.Element,
    id: string,
    placeholder: string,
    options?: {
        error?: string | string[],
        className?: string,
    }
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const FormFloating = React.memo((props: Props) => {
    const inputProps = getElementProps(props, ['label', 'className', 'options']);
    const { className = '', options } = props;

    return <div className={`form-floating ${options?.className || ''}`}>
        <input
            {...inputProps}
            className={`form-control ${(options?.error && 'is-invalid ')} ${className}`} />
        <label htmlFor={props.id}>
            {props.label}
        </label>
        {options?.error && <p className="invalid-feedback">
            {options.error}
        </p>}
    </div>
});

export default FormFloating;