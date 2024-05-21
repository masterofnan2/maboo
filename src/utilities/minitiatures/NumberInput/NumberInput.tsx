import React from "react";
import Input from "../Input/Input";

type CustomProps = {
    onChange: (number: '' | number, e?: React.ChangeEvent<HTMLInputElement>) => void
    options?: {
        error?: string,
    }
}

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const NumberInput = React.forwardRef((props: CustomProps & InputProps, ref: any) => {
    const { onChange, options, ...inputProps } = props;

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        let polyvalentValue: string | number = value;

        if (value !== '') {
            const striped = value.replace(/[^0-9]/g, '');
            polyvalentValue = parseInt(striped);
        }

        if (polyvalentValue === '' || (typeof polyvalentValue === "number" && !isNaN(polyvalentValue))) {
            onChange && onChange(polyvalentValue, e);
        }
    }, [onChange]);

    return <Input
        options={options}
        {...inputProps}
        onChange={handleChange}
        ref={ref}
    />
});

export default NumberInput;