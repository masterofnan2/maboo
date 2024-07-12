import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../utilities/redux/store";
import { Dropdown } from "react-bootstrap";
import NotificationItem, { NotificationItemPlaceHolder } from "./NotificationItem/NotificationItem";
import generateArray from "../../../../utilities/helpers/generateArray";
import EmptyNotification from "./EmptyNotification/EmptyNotification";
import { refreshAllNotifications, refreshUnreadNotifications } from "../../../../utilities/redux/customer/customerSlice";

const Notification = React.memo(() => {
    const dispatch = useDispatch<AppDispatch>();
    const { auth, notifications } = useSelector((state: Rootstate) => state.customer);
    const { all, unread } = notifications;

    React.useEffect(() => {
        if (!unread) {
            dispatch(refreshUnreadNotifications());
        } else if(!all){
            dispatch(refreshAllNotifications());
        }
    }, [unread, all]);

    if (auth) {
        return <Dropdown className="actions-dropdown notification-dropdown">
            <Dropdown.Toggle variant=''>
                <i className="fa fa-bell"></i> {Boolean(unread?.length) && <small className="count">
                    {unread?.length}
                </small>}
            </Dropdown.Toggle>
            <Dropdown.Menu align='end'>
                {Boolean(all?.length)
                    && all?.map((notification, key) => <NotificationItem
                        notification={notification}
                        key={key}
                    />)}

                {!all && generateArray(3).map((value, key) => {
                    value;
                    return <NotificationItemPlaceHolder key={key} />;
                })}

                {Boolean(all && all.length === 0) && <EmptyNotification />}
            </Dropdown.Menu>
        </Dropdown>
    }
});

export default Notification;