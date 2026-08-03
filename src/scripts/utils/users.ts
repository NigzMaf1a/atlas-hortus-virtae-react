//types
import type { LogVariant } from "./logger"

//scripts
import endpoints from "./endpoints"
import classApiFetch from "./classApiFetch"
import liveLink from "./links"
import logger from "./logger"

export default class Users {
    private readonly token: string
    public url: string
    public endpoints: typeof endpoints
    public logger: (message: string, variant?: LogVariant) => void

    constructor(token: string, backendUrl: string = liveLink["devServices"]) {
        if (!token) {
            console.error("Invalid Session")
            throw new Error("Unauthorized access. Please login")
        }

        this.token = token
        this.url = backendUrl
        this.endpoints = endpoints
        this.logger = logger
    }

    public stringifier(val: any) {
        return JSON.stringify(val)
    }

    public errorLogger(err: any) {
        console.error(err)
        throw new Error(err)
    }

    public apiFetch = async <T = unknown>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> => {
        console.log('Token', this.token)
        return classApiFetch<T>(this.url, this.token, endpoint, options)
    };
}