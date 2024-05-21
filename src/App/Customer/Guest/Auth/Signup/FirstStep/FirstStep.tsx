import React, { FormEvent } from "react";
import { Link } from "react-router-dom";
import FormFloating from "../../../../../../utilities/minitiatures/FormFloating/FormFloating";
import getFormData from "../../../../../../utilities/helpers/getFormData";
import getValidationMessages from "../../../../../../utilities/helpers/getValidationMessages";
import { verifyEmailConformity } from "../../../../../../utilities/api/actions";
import Button from "../../../../../../utilities/minitiatures/Button/Button";
import handleInputBlur from "../../../../../../utilities/helpers/handleInputBlur";
import { AxiosError } from "axios";
import truthyEntriesOnly from "../../../../../../utilities/helpers/truthyEntriesOnly";

type FirstStepData = {
    email?: string,
}

type Props = {
    nextStep: Function,
    setEmail: (email: string) => void,
    mailError?: string
}

const FirstStep = React.memo((props: Props) => {
    const [state, setState] = React.useState({
        validationMessages: null as null | FirstStepData,
        loading: false,
    });

    const handleSubmit = React.useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: FirstStepData | null = getFormData(e);
        const validationMessages = getValidationMessages<FirstStepData>(formData);

        setState(s => ({ ...s, validationMessages, loading: !Boolean(validationMessages) }));

        if (!validationMessages) {
            const newState = { ...state };
            verifyEmailConformity(formData.email!)
                .then(() => {
                    props.setEmail(formData.email!);
                    props.nextStep();
                })
                .catch((error: AxiosError<{ errors: FirstStepData }, any>) => {
                    newState.validationMessages = { email: error.response?.data?.errors?.email };
                })
                .finally(() => {
                    setState(s => ({ ...s, ...newState, loading: false }));
                });
        }
    }, [state]);

    const handleBlur = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const callback = (validationMessages: FirstStepData) => {
            const newValidationMessages = truthyEntriesOnly({ ...state.validationMessages, ...validationMessages });
            setState(s => ({ ...s, validationMessages: newValidationMessages }));
        }

        handleInputBlur(e, callback);
    }, [state.validationMessages]);

    return <form
        className="signup-container"
        onSubmit={handleSubmit}>
        <FormFloating
            type="text"
            id="email"
            placeholder="email"
            name="email"
            label={<><i className="fa fa-envelope"></i> Email</>}
            options={{ error: state.validationMessages?.email || props.mailError }}
            onBlur={handleBlur}
            required
        />

        <div className="actions">
            <Button
                type="submit"
                className="btn main-button"
                options={{ loading: state.loading }}
                disabled={Boolean(state.validationMessages)}>
                S'inscrire
            </Button>
            <Link type="button"
                to={'/auth/login'}
                className="other-button btn btn-sm">
                J'ai un compte
            </Link>
        </div>
    </form>
});

export default FirstStep;