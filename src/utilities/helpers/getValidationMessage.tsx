const getValidationMessage = (type: string, value: string): string | null => {
    let message = null;
    let regexPattern = null;

    switch (type) {
        case "name":
            regexPattern = /^[a-zéèâàäöïîôòìëêûüùç]{2,20}$/i;
            if (!value) {
                message = "Le nom est requis.";
            } else if (value.length < 2) {
                message = "Le nom doit contenir au moins 2 (deux) caractères.";
            } else if (!regexPattern.test(value)) {
                message = "Le nom doit contenir uniquement des caractères alphabétiques.";
            }

            break;

        case "firstname":
            regexPattern = /^[a-zéèâàäöïîôòìëêûüùç]{2,20}(\s[a-zéèâàäöïîôòìëêûüùç]{2,20}){0,2}$/i;
            if (!value) {
                message = "Le prénom est requis.";
            } else if (value.length < 2) {
                message = "Le prénom doit contenir au moins 2 (deux) caractères.";
            } else if (!regexPattern.test(value)) {
                message = "Le prénom doit contenir uniquement des caractères alphabétiques.";
            }

            break;

        case "email":
            regexPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

            if (!value) {
                message = "L'adresse email est requise.";
            } else if (!regexPattern.test(value)) {
                message = "Le format de l'email n'est pas valide.";
            }
            break;

        case "password":
            if (!value) {
                message = "Le mot de passe est requis.";
            } else if (value.length < 6) {
                message = "Le mot de passe doit contenir au moins six caractères.";
            }
            break;

        case "current_password":
            if (!value) {
                message = "Le mot de passe est requis.";
            } else if (value.length < 6) {
                message = "Le mot de passe doit contenir au moins six caractères.";
            }
            break;

        case "password_confirmation":
            if (!value) {
                message = "The password is required";
            } else if (value.length < 6) {
                message = "The password length should be at least 6 caracters";
            }
            break;

        case "prix":
            const price = parseFloat(value);

            if (!price) {
                message = "Le prix est obligatoire";
            } else if (price < 0) {
                message = "Le prix du produit ne doit pas être négatif";
            }
            break;

        case 'description':
            if (!value) {
                message = "la description du produit est obligatoire";
            }
            break;

        default:
            break;
    }

    return message;
}

export default getValidationMessage;