import React from "react";
import { Accordion } from "react-bootstrap";
import SellerCollapse from "./SellerCollapse/SellerCollapse";
import AdminCollapse from "./AdminCollapse/AdminCollapse";

const AccordionActions = React.memo(() => {
    return <div className="accordion-actions-container">
        <Accordion>
            <SellerCollapse />
            <AdminCollapse />
        </Accordion>
    </div>
})

export default AccordionActions;