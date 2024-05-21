import React, { FormEvent } from "react";
import { Link } from "react-router-dom";
import FormFloating from "../../../../../../utilities/minitiatures/FormFloating/FormFloating";
import getFormData from "../../../../../../utilities/helpers/getFormData";
import getValidationMessages from "../../../../../../utilities/helpers/getValidationMessages";
import { signup } from "../../../../../../utilities/api/customer/actions";
import Button from "../../../../../../utilities/minitiatures/Button/Button";
import storeToken from "../../../../../../utilities/helpers/storeToken";
import handleInputBlur from "../../../../../../utilities/helpers/handleInputBlur";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../../../../utilities/redux/customer/customerSlice";
import { AxiosError } from "axios";
import truthyEntriesOnly from "../../../../../../utilities/helpers/truthyEntriesOnly";

type Props = {
    prevStep: Function,
    setValidationMessages: Function,
    email: string,
    activeStep: number,
}

type SecondStepData = {
    name?: string,
    firstname?: string,
    password?: string
};

const THISSTEP = 1;

const SecondStep = React.memo((props: Props) => {
    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        validationMessages: null as null | SecondStepData,
        loading: false,
    });

    const handleSubmit = React.useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: SecondStepData = getFormData(e);
        const validationMessages = getValidationMessages<SecondStepData>(formData);

        setState(s => ({ ...s, loading: !Boolean(validationMessages), validationMessages }));
        if (!validationMessages) {
            const newState = { ...state };
            signup({ ...formData, email: props.email })
                .then((response) => {
                    const { token, user } = response.data;
                    storeToken("Customer", token);
                    dispatch(setAuth(user));
                })
                .catch((error: AxiosError<{ errors: SecondStepData & { email?: string } }, any>) => {
                    const errors = error.response?.data?.errors || {};

                    if (errors.email) {
                        newState.validationMessages = null;
                        props.setValidationMessages({ email: errors.email });
                        props.prevStep();
                    } else {
                        newState.validationMessages = errors;
                    }
                })
                .finally(() => {
                    newState.loading = false;
                    setState(s => ({ ...s, ...newState }));
                });
        }
    }, [props.email, props.setValidationMessages, state]);

    React.useEffect(() => {
        if (props.activeStep === THISSTEP && !props.email) {
            props.setValidationMessages({ email: "L'adresse email est requise" });
            props.prevStep();
        }
    }, [props.activeStep, props.email, props.setValidationMessages]);

    const handleBlur = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const callback = (validationMessages: SecondStepData) => {
            const newValidationMessages = truthyEntriesOnly({ ...state.validationMessages, ...validationMessages });
            setState(s => ({ ...s, validationMessages: newValidationMessages }));
        }

        handleInputBlur(e, callback);
    }, [state.validationMessages]);

    return <form className="signup-container" onSubmit={handleSubmit}>
        <FormFloating
            type="text"
            name="name"
            id="name"
            placeholder="name"
            label={<><i className="fa fa-user"></i> Nom</>}
            options={{ error: state.validationMessages?.name }}
            onBlur={handleBlur}
            required
        />

        <FormFloating
            type="text"
            name="firstname"
            id="firstname"
            placeholder="firstname"
            label={<><i className="fa fa-user"></i> Prénom(s)</>}
            options={{ error: state.validationMessages?.firstname }}
            onBlur={handleBlur}
            required
        />

        <FormFloating
            type="password"
            name="password"
            id="password"
            placeholder="password"
            label={<><i className="fa fa-lock"></i> Mot de passe</>}
            options={{ error: state.validationMessages?.password }}
            onBlur={handleBlur}
            required
        />

        <div className="actions">
            <Button
                type="submit"
                className="btn main-button"
                options={{ loading: state.loading }}
                disabled={Boolean(state.validationMessages)}>
                Terminé
            </Button>
            <Link type="button"
                to={'/auth/login'}
                className="other-button btn btn-sm">
                J'ai un compte
            </Link>
        </div>
    </form>
});

export default SecondStep;