const APPSTORAGEPATH = `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/storage/`;

const appImage = (image: string | null): string | undefined => {
    if (image) {
        return APPSTORAGEPATH + image;
    }

    return undefined;
}

export default appImage;