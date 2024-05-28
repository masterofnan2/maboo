import React from "react";
import emptyOrders from './empty-orders.png';

const EmptyOrders = React.memo(() => {
    return <div className="orders-empty-container">
        <img src={emptyOrders} />
        <h6 className="display-6">Aucune commande trouvée !</h6>
    </div>
})

export default EmptyOrders;