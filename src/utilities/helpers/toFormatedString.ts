
const LOCALES = 'fr-FR';

export default function (number: number | string): string {
    if (number === 0 || number === "") {
        return '';
    }

    return number.toLocaleString(LOCALES)
}