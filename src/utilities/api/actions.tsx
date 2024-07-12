import AppAxios from "./AppAxios";

const axios = new AppAxios();

export const verifyEmailConformity = (email: string) => {
    return axios.post('/auth/verify-email-conformity', { email });
}

