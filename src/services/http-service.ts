export class Http {

    async get(url: string) {

        if (!url) {
            return undefined
        }

        return await this.execute(url, 'GET')
    }

    async post(url: string, data?: any) {

        if (!url) {
            return undefined
        }

        return await this.execute(url, 'POST', data)
    }

    async execute(url: string, method: string, data?: any): Promise<Response> {

        if (!url || !method) {
            return undefined
        }

        const request: RequestInit = {
            method: method,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': (data ? 'application/json' : undefined)
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: (data ? JSON.stringify(data) : undefined) // body data type must match "Content-Type" header
        }

        return await fetch(url, request)
    }
}