export class FetchService {

    async get(url: string, cors: CorsMode = CorsMode.Enable) {
        const response = await fetch(url, {
            method: 'GET',
            mode: cors,
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer' // no-referrer, *client
            //body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return await response.json(); // parses JSON response into native JavaScript objects
    }
}

export enum CorsMode {
    Enable = "cors",
    SameOrigin = "same-origin",
    Disable = "no-cors"
}