import React from "react";
import getElementProps from "../../helpers/getElementProps";

const VISIBLE = 1;
const HIDDEN = 2;
const ENTERING = 3;
const LEAVING = 4;

type Props = {
    visible: boolean,
    children: any,
    duration?: number,
    animateEnter?: boolean,
    id?: string,
    className?: string,
    from: {
        transform?: string
        opacity?: number,
    },
}

type Style = {
    transitionDuration: string,
    transitionProperty: string,
    opacity?: number,
    transform?: string
}

export function Fade(props: Props) {
    const {
        visible,
        children,
        duration = 300,
        animateEnter = false,
        from = { opacity: 0 },
        className
    } = props;

    const divProps = getElementProps(props, ['visible', 'children', 'duration', 'animateEnter', 'from', 'className']);

    const childRef = React.useRef(children);
    const [state, setState] = React.useState(
        visible ? (animateEnter ? ENTERING : VISIBLE) : HIDDEN
    );

    if (visible) {
        childRef.current = children;
    }

    React.useEffect(() => {
        if (!visible) {
            setState(LEAVING);
        } else {
            setState((s) => (s === HIDDEN ? ENTERING : VISIBLE));
        }
    }, [visible]);

    React.useEffect(() => {
        if (state === LEAVING) {
            const timer = setTimeout(() => {
                setState(HIDDEN);
            }, duration);
            return () => {
                clearTimeout(timer);
            };
        } else if (state === ENTERING) {
            document.body.offsetHeight;
            setState(VISIBLE);
        }
    }, [state]);

    if (state === HIDDEN) {
        return null;
    }

    let style: Style = {
        transitionDuration: `${duration}ms`,
        transitionProperty: "opacity transform",
    };

    if (state !== VISIBLE) {
        style.opacity = from.opacity;
        if (from.transform) {
            style.transform = from.transform;
        }
    }

    return <div
        style={style}
        className={"element-fade " + (className || '')}
        {...divProps}>{childRef.current}</div>;
}

export default Fade;