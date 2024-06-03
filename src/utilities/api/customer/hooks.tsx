import React from "react";
import { addToCart } from "./actions";
import useToasts from "../../minitiatures/Toast/hooks/useToasts";
import { useDispatch } from "react-redux";
import { refreshCart } from "../../redux/customer/customerSlice";
import { AppDispatch } from "../../redux/store";
import { AxiosError } from "axios";

export type Payload = {
    product_id: number,
    quantity: number,
    product_variant_id?: number,
}

type UseAddToCartProps = {
    payload: Payload,
    onInit?: Function,
    onSuccess?: Function,
    onError?: Function,
    onFinally?: Function,
}

export const useAddToCart = () => {
    const toasts = useToasts();
    const dispatch = useDispatch<AppDispatch>();

    const handleAddToCart = React.useCallback((options: UseAddToCartProps) => {
        const { onError, onFinally, onInit, onSuccess, payload } = options;
        onInit && onInit();

        addToCart(payload)
            .then((response) => {
                toasts.push({
                    title: "Ajouté au panier",
                    content: "Votre panier a été mis à jour avec succès",
                    type: "success",
                })

                dispatch(refreshCart());
                onSuccess && onSuccess(response);
            })
            .catch((error: AxiosError) => {
                let message = "";

                switch (error.response?.status) {
                    case 403:
                        message = "Les vendeurs et les administrateurs ne peuvent pas ajouter des produits au panier.";
                        break;

                    default:
                        message = "Une erreur s'est produite lors de l'ajout au panier, veuillez réessayer plus tard.";
                        break;
                }

                toasts.push({
                    title: "Impossible d'ajouter au panier",
                    content: message,
                    type: "danger"
                })

                onError && onError(error);
            })
            .finally(() => {
                onFinally && onFinally();
            })
    }, [toasts.push]);

    return handleAddToCart;
}