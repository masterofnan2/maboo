import React, { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import getFormData from "../../../../../utilities/helpers/getFormData";
import getValidationMessages from "../../../../../utilities/helpers/getValidationMessages";
import { resetPassword } from "../../../../../utilities/api/admin/actions";
import storeToken from "../../../../../utilities/helpers/storeToken";
import { setAuth } from "../../../../../utilities/redux/admin/adminSlice";
import { AxiosError } from "axios";
import handleInputBlur from "../../../../../utilities/helpers/handleInputBlur";
import FormFloating from "../../../../../utilities/minitiatures/FormFloating/FormFloating";
import Button from "../../../../../utilities/minitiatures/Button/Button";
import truthyEntriesOnly from "../../../../../utilities/helpers/truthyEntriesOnly";
import useToasts from "../../../../../utilities/minitiatures/Toast/hooks/useToasts";

type ResetPasswordData = {
    password?: string,
    password_confirmation?: string
}

const REDIRECTPAGE = '/';

const ResetPassword = React.memo(() => {
    const [state, setState] = React.useState({
        validationMessages: null as ResetPasswordData | null,
        loading: false
    });

    const { token } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toasts = useToasts();

    const handleSubmit = React.useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (token) {
            const formData = getFormData(e) as ResetPasswordData;
            const validationMessages = getValidationMessages<ResetPasswordData>(formData);

            setState(s => ({ ...s, validationMessages, loading: !Boolean(validationMessages) }));

            if (!validationMessages) {
                const newState = { ...state };

                resetPassword({
                    token: token,
                    password: formData.password!,
                    password_confirmation: formData.password_confirmation!
                })
                    .then(response => {
                        const { token, user } = response.data;
                        if (user && token) {
                            storeToken("Admin", token);
                            dispatch(setAuth(user));
                        }
                    })
                    .catch((error: AxiosError<any, any>) => {
                        const { errors } = error.response?.data;

                        if (errors.token) {
                            toasts.push({
                                title: "Action non autorisée",
                                content: "Votre demande de réinitialisation de mot de passe a été rejetée",
                                type: "danger"
                            });

                            navigate(REDIRECTPAGE);
                        }

                        if (errors) {
                            newState.validationMessages = errors;
                        }
                    })
                    .finally(() => {
                        setState(s => ({ ...s, ...newState, loading: false }));
                    })
            }
        }
    }, [token]);

    const handleBlur = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const callback = (validationMessages: ResetPasswordData) => {
            const newValidationMessages = truthyEntriesOnly({ ...state.validationMessages, ...validationMessages });
            setState(s => ({ ...s, validationMessages: newValidationMessages }));
        }

        handleInputBlur(e, callback);
    }, [state.validationMessages]);

    if (token) {
        return <form className="reset-password-container" onSubmit={handleSubmit}>
            <h5 className="display-6">Finalisation de la réinitialisation</h5>
            <FormFloating
                type="password"
                placeholder="password"
                name="password"
                onBlur={handleBlur}
                id="password"
                label={<><i className="fa fa-lock"></i> password</>}
                options={{
                    error: state.validationMessages?.password
                }}
                required
            />

            <FormFloating
                type="password"
                placeholder="password confirmation"
                name="password_confirmation"
                onBlur={handleBlur}
                id="password_confirmation"
                label={<><i className="fa fa-user-lock"></i> confirmation</>}
                options={{
                    error: state.validationMessages?.password_confirmation
                }}
                required
            />

            <Button
                type="submit"
                className="btn-primary col-6"
                options={{ loading: state.loading }}
                disabled={Boolean(state.validationMessages)}>Reset Password</Button>
        </form>
    }
});

export default ResetPassword;