import React from "react";
import Fade from "../Fade/Fade";
import Button from "../Button/Button";

type Props = {
    initConfirmation: Function
};

let interval: null | number;
const DEFAULTCOUNTDOWN = 60;

const ResendEmailCountdown = React.memo((props: Props) => {
    const { initConfirmation } = props;

    const [countdown, setCountDown] = React.useState(DEFAULTCOUNTDOWN);

    React.useEffect(() => {
        if (countdown > 0) {
            if (!interval) {
                interval = setInterval(() => {
                    setCountDown(c => --c);
                }, 1000);
            }
        } else {
            interval && clearInterval(interval);
            interval = null;
        }

        return () => {
            interval && clearInterval(interval);
            interval = null;
        }
    }, [countdown]);

    const handleResendCode = React.useCallback(() => {
        initConfirmation();
        setCountDown(DEFAULTCOUNTDOWN);
    }, [initConfirmation]);

    return <div>
        Vous n'avez reçu aucun email? <br />
        <Fade
            animateEnter={true}
            from={{ opacity: 0 }}
            visible={countdown > 1}
            className="wait-message">
            Vous pouvez demander un autre code dans <span className="has-number">{countdown}</span>
        </Fade>
        <Fade
            from={{ opacity: 0 }}
            animateEnter={true}
            visible={countdown === 0}>
            <Button
                type="button"
                className="btn-primary mt-2"
                onClick={handleResendCode}>Renvoyer le code</Button>
        </Fade>
    </div>
});

export default ResendEmailCountdown;