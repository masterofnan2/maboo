import React from "react";
import getElementProps from "../../helpers/getElementProps";
import { motion } from "framer-motion";
import Fade from "../Fade/Fade";

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
        <motion.input
            {...inputProps}
            className={`form-control ${(options?.error && 'is-invalid ')} ${className}`}
            layout/>
        <label htmlFor={props.id}>
            {props.label}
        </label>
        <Fade className="invalid-feedback" show={Boolean(options?.error)}>
            {options?.error}
        </Fade>
    </div>
});

export default FormFloating;