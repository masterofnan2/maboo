import React from "react";

type Props = {
    label:  React.ReactNode,
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Checkbox = React.forwardRef((props: Props, ref?: React.LegacyRef<HTMLDivElement>) => {
    const { label, className = '', id = '', ...inputProps} = props;
    const randomId = 'checkbox' + (Math.random() * 1000).toFixed();

    return <div className={"checkbox " + className} ref={ref}>
        <input
            type='checkbox'
            id={`${randomId} ${id}`}
            {...inputProps} />
        <label htmlFor={id}>
            {label}
        </label>
    </div>
});

export default Checkbox;