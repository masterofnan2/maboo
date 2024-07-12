import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export type UserTypes = 'Customer' | 'Admin' | 'Seller' | 'Professionnal';

type Headers = {
    Accept?: string,
    Authorization?: string,
    'Content-Type'?: string,
}

type Response = Promise<AxiosResponse<any, any>>;

export const SESSIONREDIRECTED = 'redirected';
const APIURL = import.meta.env.VITE_APP_API_URL;
const AUTHORIZATIONPREFIX = 'Bearer ';
const TOKENSUFFIX = 'Token';
const UNAUTHORIZED = 401;
const DEFAULTHEADERS: Headers = {
    Accept: 'application/json',
};

const DEFAULTISFORMDATA: boolean = false;
const DEFAULTRELOADONUNAUTHORIZED: boolean = true;

export default class AppAxios {
    private userType: UserTypes | null = null;
    private authorizationTokenName: string | null = null;

    private _isFormData = DEFAULTISFORMDATA;
    private _reloadOnUnauthorized = DEFAULTRELOADONUNAUTHORIZED;

    constructor(userType?: UserTypes) {
        if (userType) {
            this.userType = userType;
            this.authorizationTokenName = userType + TOKENSUFFIX;
        }
    }

    private __reset() {
        this._isFormData = DEFAULTISFORMDATA;
        this._reloadOnUnauthorized = DEFAULTRELOADONUNAUTHORIZED;
    }

    private getAuthorizationToken(): string | null {
        const token = localStorage.getItem(this.authorizationTokenName!);
        let Authorization: string | null = null;

        if (token) {
            Authorization = AUTHORIZATIONPREFIX + token;
        }

        return Authorization;
    }

    private getHeaders() {
        const headers = { ...DEFAULTHEADERS };

        if (this.userType) {
            const Authorization = this.getAuthorizationToken();

            if (Authorization) {
                headers.Authorization = Authorization;
            }
        }

        if (!this._isFormData) {
            headers['Content-Type'] = 'application/json';
        }

        return headers;
    }

    private createAxiosInstance(): AxiosInstance {
        return axios.create({
            baseURL: APIURL,
            headers: this.getHeaders(),
        });
    }

    private handleUnauthorized() {
        sessionStorage.setItem(SESSIONREDIRECTED, SESSIONREDIRECTED);
        location.pathname = this.getRedirectPathname();
    }

    private async init(action: () => Response): Response {
        let result;

        try {
            result = await action();
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (this._reloadOnUnauthorized && error.response?.status === UNAUTHORIZED) {
                    this.handleUnauthorized();
                }
            }

            throw error;
        }

        this.__reset();
        return result!;
    }

    private getRedirectPathname() {
        switch (this.userType) {
            case 'Admin':
                return '/admin/auth/login';

            case 'Seller':
                return '/seller/auth/login';

            case 'Professionnal':
                return '/professional/auth/login';

            default:
                return '/auth/login';
        }
    }

    public disableRedirectOnUnauthorized(): AppAxios {
        this._reloadOnUnauthorized = false;
        return this;
    }

    public payloadHasFile(): AppAxios {
        this._isFormData = true;
        return this;
    }

    public setUserType(userType: UserTypes): AppAxios {
        this.userType = userType;
        this.authorizationTokenName = userType + TOKENSUFFIX;

        return this;
    }

    public async post(url: string, payload: any) {
        const appAxios = this.createAxiosInstance();
        return await this.init(() => appAxios.post(url, payload));
    }

    public async get(url: string) {
        const appAxios = this.createAxiosInstance();
        return await this.init(() => appAxios.get(url));
    }

    public async delete(url: string) {
        const appAxios = this.createAxiosInstance();
        return await this.init(() => appAxios.delete(url));
    }

    public async put(url: string, payload?: any) {
        const appAxios = this.createAxiosInstance();
        return await this.init(() => appAxios.put(url, payload));
    }
}