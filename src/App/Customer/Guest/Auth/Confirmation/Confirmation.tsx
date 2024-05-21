import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../../utilities/redux/store";
import { makeEmailConfirmation, matchConfirmationCode } from "../../../../../utilities/api/customer/actions";
import { refreshAuth } from "../../../../../utilities/redux/customer/customerSlice";
import { AxiosError } from "axios";
import CodeInput from "../../../../../utilities/minitiatures/CodeInput/CodeInput";
import ResendEmailCountdown from "../../../../../utilities/minitiatures/ResendEmailCountdown/ResendEmailCountdown";
import usePagePreloader from "../../../../../utilities/minitiatures/PagePreloader/hooks/usePagePreloader";

const Confirmation = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: Rootstate) => state.customer.auth);
    const pagePreloader = usePagePreloader();

    const [state, setState] = React.useState({
        error: ''
    });

    React.useEffect(() => {
        if (user && !user.email_verified_at) {
            makeEmailConfirmation();
        }
    }, [user]);

    const handleComplete = React.useCallback((code: string) => {
        pagePreloader.enable();
        matchConfirmationCode(code)
            .then(response => {
                if (response.data?.matched) {
                    dispatch(refreshAuth());
                }
            })
            .catch((error: AxiosError<any, any>) => {
                const codeError = error.response?.data?.errors?.code || '';

                if (codeError) {
                    setState(s => ({ ...s, error: codeError }));
                }
            }).finally(() => {
                pagePreloader.disable();
            })
    }, []);

    if (user && !user.email_verified_at) {
        return <form className="confirmation-container">
            <label htmlFor="code-input-0">
                <h3 className="display-6 mb-1">Veuillez Confirmer votre email</h3>
                <p className="confirmation-message">
                    Nous avons envoyé un email à <span className="user-email has-number">{user.email}</span>,
                    Veuillez consulter votre boite de réception.
                </p>
            </label>

            <CodeInput
                onComplete={handleComplete}
                length={6}
                error={state.error}
            />

            <ResendEmailCountdown initConfirmation={makeEmailConfirmation} />
        </form>
    }
}

export default Confirmation;