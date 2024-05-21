import React from "react";
import { SESSIONREDIRECTED } from "../../../api/AppAxios";

export default function (pushToasts: Function) {
    React.useEffect(() => {
        const justRedirected = sessionStorage.getItem(SESSIONREDIRECTED);

        if (justRedirected && pushToasts) {
            pushToasts({
                title: "Identification requise!",
                content: "Veuillez vous connecter ou créer un compte pour pouvoir continuer",
                type: "default"
            })

            sessionStorage.removeItem(SESSIONREDIRECTED);
        }
    }, [pushToasts]);
}