import React, { FormEvent } from "react";
import { Link } from "react-router-dom";
import FormFloating from "../../../../../utilities/minitiatures/FormFloating/FormFloating";
import getFormData from "../../../../../utilities/helpers/getFormData";
import getValidationMessages from "../../../../../utilities/helpers/getValidationMessages";
import { login } from "../../../../../utilities/api/customer/actions";
import storeToken from "../../../../../utilities/helpers/storeToken";
import Button from "../../../../../utilities/minitiatures/Button/Button";
import handleInputBlur from "../../../../../utilities/helpers/handleInputBlur";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../../../utilities/redux/customer/customerSlice";
import { AxiosError } from "axios";
import truthyEntriesOnly from "../../../../../utilities/helpers/truthyEntriesOnly";

type LoginData = {
    email?: string,
    password?: string,
};

const Login = React.memo(() => {
    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        validationMessages: null as null | LoginData,
        loading: false,
    });

    const handleSubmit = React.useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: LoginData = getFormData(e);
        const validationMessages = getValidationMessages<LoginData>(formData);

        setState(s => ({ ...s, loading: !Boolean(validationMessages), validationMessages }));
        if (!validationMessages) {
            const newState = { ...state };
            login(formData)
                .then(response => {
                    const { token, user } = response.data;
                    storeToken("Customer", token);
                    dispatch(setAuth(user));
                })
                .catch((error: AxiosError<{ errors: LoginData }, any>) => {
                    newState.validationMessages = error.response?.data.errors || null;
                })
                .finally(() => {
                    setState(s => ({ ...s, ...newState, loading: false }));
                })
        }
    }, [state]);

    const handleBlur = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const callback = (validationMessages: LoginData) => {
            const newValidationMessages = truthyEntriesOnly({ ...state.validationMessages, ...validationMessages });
            setState(s => ({ ...s, validationMessages: newValidationMessages }));
        }

        handleInputBlur(e, callback);
    }, [state.validationMessages]);

    return <form className="login-container" onSubmit={handleSubmit}>
        <FormFloating
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            label={<><i className="fa fa-envelope"></i> Email</>}
            options={{ error: state.validationMessages?.email }}
            onBlur={handleBlur}
            required />

        <FormFloating
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            label={<><i className="fa fa-lock"></i> Mot de passe</>}
            options={{ error: state.validationMessages?.password }}
            onBlur={handleBlur}
            required />

        <div className="actions">
            <Link to={'/auth/signup'} type="button"
                className="other-button btn">
                Créer un compte
            </Link>
            <Button
                type="submit"
                className="btn main-button"
                options={{ loading: state.loading }}
                disabled={Boolean(state.validationMessages)}>
                Se connecter
            </Button>
        </div>

        <Link
            to='/auth/password-forgotten'>Récuperer le mot de passe.</Link>
    </form>
});

export default Login;