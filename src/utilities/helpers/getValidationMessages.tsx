import getValidationMessage from "./getValidationMessage"

type JsObject = {
    [key: string]: any,
}

function getValidationMessages<Obj>(formData: JsObject): Obj | null {
    let messages = {} as JsObject;
    
    for (let name in formData) {
        const message = getValidationMessage(name, formData[name]);
        if (message) {
            messages = { ...messages, [name]: message }
        }
    }

    return (Object.keys(messages).length) ? messages as Obj : null;
}

export default getValidationMessages;