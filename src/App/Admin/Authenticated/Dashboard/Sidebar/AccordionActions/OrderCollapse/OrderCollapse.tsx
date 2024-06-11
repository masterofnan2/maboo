import React from "react";
import { Accordion } from "react-bootstrap";
import ListOfPage from "../../ListOfpage/ListOfPage";

const OrderCollapse = React.memo(() => {
    return <Accordion.Item eventKey="2">
        <Accordion.Button>
            Commandes
        </Accordion.Button>
        <Accordion.Collapse eventKey="2">
            <>
                <ListOfPage
                    icon="fa-solid fa-seal-question"
                    path="/orders/unchecked"
                    title="Non vérifié"
                    className="p-3" />
                    
                <ListOfPage
                    icon="fa-solid fa-hourglass-end"
                    path="/orders/processing"
                    title="En cours"
                    className="p-3" />
            </>
        </Accordion.Collapse>
    </Accordion.Item>
});

export default OrderCollapse;