import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type Props = {
    children: any,
    show: boolean,
    className?: string,
    id?: string,
    layout?: boolean,
};

const variants = {
    visible: {
        opacity: 1,
        transition: { delay: .3, duration: .4 }
    },
    hidden: {
        opacity: 0
    }
}

const Fade = React.memo((props: Props) => {
    const { children, show, ...divProps } = props;

    return <AnimatePresence>
        {show &&
            <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                {...divProps}>
                {children}
            </motion.div>}
    </AnimatePresence>
});

export default Fade;