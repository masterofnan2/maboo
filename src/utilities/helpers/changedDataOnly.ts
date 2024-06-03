type Data = { [key: string]: any }

const changedDataOnly = (newData: Data, comparisonObject: Data): Data | null => {
    let data = {} as Data;

    for (let key in newData) {
        if (comparisonObject[key] != newData[key]) {
            data[key] = newData[key];
        }
    }

    return Object.keys(data).length > 0 ? data : null;
}

export default changedDataOnly;