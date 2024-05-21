import getValidationMessage from "./getValidationMessage";

const handleInputBlur = (event: any, callback: Function) => {
    const { name, value } = event.target;
    const validationMessage = getValidationMessage(name, value);

    const validationsMessages = {
        [name]: validationMessage
    };

    callback(validationsMessages);
}

export default handleInputBlur;