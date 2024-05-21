import React from "react";
import FormFloating from "../../../../../../../../utilities/minitiatures/FormFloating/FormFloating";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../../../../../utilities/redux/store";
import { User } from "../../../../../../../../utilities/types/types";
import handleInputBlur from "../../../../../../../../utilities/helpers/handleInputBlur";
import getFormData from "../../../../../../../../utilities/helpers/getFormData";
import getValidationMessages from "../../../../../../../../utilities/helpers/getValidationMessages";
import Button from "../../../../../../../../utilities/minitiatures/Button/Button";
import { updateUser } from "../../../../../../../../utilities/api/admin/actions";
import { AxiosError } from "axios";
import { refreshAuth } from "../../../../../../../../utilities/redux/admin/adminSlice";
import changedDataOnly from "../../../../../../../../utilities/helpers/changedDataOnly";
import truthyEntriesOnly from "../../../../../../../../utilities/helpers/truthyEntriesOnly";
import useToasts from "../../../../../../../../utilities/minitiatures/Toast/hooks/useToasts";
import Fade from "../../../../../../../../utilities/minitiatures/Fade/Fade";

type PublicData = {
    email?: string,
    name?: string,
    firstname?: string,
}

const Public = React.memo(() => {
    const user = useSelector((state: Rootstate) => state.admin.auth) as User;
    const dispatch = useDispatch<AppDispatch>();

    const toasts = useToasts();

    const [state, setState] = React.useState({
        validationMessages: null as null | PublicData,
        loading: false,
        hasChanges: false,
    });

    const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = getFormData(e) as PublicData;
        const validationMessages = getValidationMessages<PublicData>(formData);
        const changedData = changedDataOnly(formData, user);

        setState(s => ({
            ...s, loading: !Boolean(validationMessages) && Boolean(changedData),
            validationMessages
        }));

        if (!validationMessages && changedData) {
            const newState = { ...state };
            updateUser(changedData)
                .then(() => {
                    newState.hasChanges = false;
                    dispatch(refreshAuth());

                    toasts.push({
                        title: "Modifications réussies!",
                        content: "Vos informations ont été mises à jours avec succès.",
                        type: "success"
                    });
                })
                .catch((error: AxiosError) => {
                    const { errors } = error.response?.data as { errors: null };
                    if (errors) {
                        newState.validationMessages = errors;
                    }
                })
                .finally(() => {
                    setState(s => ({ ...s, ...newState, loading: false }));
                });
        } else if (!changedData) {
            setState(s => ({ ...s, hasChanges: false }));
        }
    }, [state, user, toasts.push]);

    const handleBlur = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as keyof User;
        const { value } = e.target;

        const callback = (validationMessages: PublicData) => {
            const newValidationMessages = truthyEntriesOnly({ ...state.validationMessages, ...validationMessages });
            setState(s => ({ ...s, validationMessages: newValidationMessages, hasChanges: true }));
        }

        if (value !== user[name]) {
            handleInputBlur(e, callback);
        }
    }, [user, state.validationMessages]);

    return <form className="public-container" onSubmit={handleSubmit}>
        <FormFloating
            type="text"
            name="name"
            id="name"
            placeholder="nom"
            defaultValue={user.name}
            label={<><i className="fa fa-user-tie"></i> Nom</>}
            options={{
                error: state.validationMessages?.name,
                className: 'col-3'
            }}
            onBlur={handleBlur}
        />

        <FormFloating
            type="text"
            name="firstname"
            id="firstname"
            placeholder="nom"
            defaultValue={user.firstname}
            label={<><i className="fa fa-user"></i> Prénom</>}
            options={{
                error: state.validationMessages?.firstname,
                className: 'col-3'
            }}
            onBlur={handleBlur}
        />

        <FormFloating
            className="has-number"
            type="email"
            name="email"
            id="email"
            placeholder="email"
            defaultValue={user.email}
            label={<><i className="fa fa-envelope"></i> Email</>}
            options={{
                error: state.validationMessages?.email,
                className: 'col-3'
            }}
            onBlur={handleBlur}
        />

        <Fade
            className="d-flex justify-content-end col-12"
            from={{ opacity: 0 }}
            visible={state.hasChanges}
            animateEnter={true}>
            <Button
                type="submit"
                className="btn btn-secondary"
                options={{ loading: state.loading }}
                disabled={Boolean(state.validationMessages)}>
                <i className="fa fa-check"></i> Enregistrer
            </Button>
        </Fade>
    </form>
});

export default Public;