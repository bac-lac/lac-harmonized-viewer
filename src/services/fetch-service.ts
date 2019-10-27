export class FetchService {

    static async execute(url: string, method: string, contentType: string, cors: CorsMode = CorsMode.Enable) {
        const response = await fetch(url, {
            method: method,
            mode: cors,
            cache: 'no-cache',
            //credentials: 'same-origin',
            headers: {
                //'Content-Type': 'application/json'
                //'Content-Type': contentType
            },
            redirect: 'follow', // manual, *follow, error
            //referrer: 'no-referrer' // no-referrer, *client
            //body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        return await response.blob() // parses JSON response into native JavaScript objects
    }
}

export enum CorsMode {
    Enable = "cors",
    SameOrigin = "same-origin",
    Disable = "no-cors"
}