import React from "react";
import getElementProps from "../../helpers/getElementProps";

type Props = {
    label: any,
    className?: string,
    onChange?: Function,
    defaultChecked?: boolean,
    disabled?: boolean,
    checked?: boolean,
}

const Checkbox = React.forwardRef((props: Props, ref?: React.LegacyRef<HTMLDivElement>) => {
    const { label, className = '' } = props;
    const inputProps = getElementProps(props, ['label']);
    const id = 'checkbox' + (Math.random() * 1000).toFixed();

    return <div className={"checkbox " + className} ref={ref}>
        <input
            type='checkbox'
            id={id}
            {...inputProps} />
        <label htmlFor={id}>
            {label}
        </label>
    </div>
});

export default Checkbox;