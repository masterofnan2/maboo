import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../redux/store";
import { getWstoken } from "../../api/customer/actions";
import { refreshAllNotifications, refreshUnreadNotifications } from "../../redux/customer/customerSlice";
import useToasts from "../../minitiatures/Toast/hooks/useToasts";

const BASE_URL = import.meta.env.VITE_APP_NOTIFICATION_WS_URL;

export default function () {
    const dispatch = useDispatch<AppDispatch>();
    const { auth } = useSelector((state: Rootstate) => state.customer);
    const toasts = useToasts();

    const [state, setState] = React.useState({
        token: '',
        connection: null as WebSocket | null,
    });

    React.useEffect(() => {
        if (auth && !state.token) {
            getWstoken()
                .then(response => {
                    setState(s => ({ ...s, token: response.data.token }));
                })
        }
    }, [state.token, auth]);

    React.useEffect(() => {
        if (state.token && !state.connection) {
            const connection = new WebSocket(`${BASE_URL}/${state.token}`);
            setState(s => ({ ...s, connection }));

            connection.onmessage = (e: MessageEvent<string>) => {
                const { title, line } = JSON.parse(e.data);

                dispatch(refreshUnreadNotifications());
                dispatch(refreshAllNotifications());

                toasts.push({
                    title,
                    content: line,
                    type: "default",
                })
            }
        }
    }, [state.token, state.connection, toasts.push]);
}