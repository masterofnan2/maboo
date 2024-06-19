import NavTabs from "../../../../../utilities/minitiatures/NavTabs/NavTabs";
import { NavTab } from "../../../../../utilities/minitiatures/NavTabs/NavTab/NavTab";
import React from "react";
import Cancelled from "../Cancelled/Cancelled";
import Processing from "../Processing/Processing";
import Closed from "../Closed/Closed";

const CANCELLED = 'CANCELLED';
const PROCESSING = 'PROCESSING';
const CLOSED = 'CLOSED';

type Tabs = typeof CANCELLED | typeof PROCESSING | typeof CLOSED;
const defaultActive = CANCELLED;

const List = React.memo(() => {

    const [state, setState] = React.useState({
        active: defaultActive as Tabs,
    });

    const setActive = React.useCallback((active: Tabs) => {
        setState(s => ({ ...s, active }))
    }, []);

    const ActiveComponent = React.useMemo(() => {
        switch (state.active) {
            case PROCESSING:
                return Processing;

            case CLOSED:
                return Closed;

            default:
                return Cancelled;
        }
    }, [state.active]);

    return <div className="orders-list">
        <NavTabs active={state.active} setActive={setActive}>
            <NavTab eventKey={CANCELLED}>Annulée(s)</NavTab>
            <NavTab eventKey={PROCESSING}>En cours</NavTab>
            <NavTab eventKey={CLOSED}>Terminée(s)</NavTab>
        </NavTabs>

        <ActiveComponent />
    </div>
});

export default List;