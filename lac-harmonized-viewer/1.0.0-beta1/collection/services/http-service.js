// export class httpClient {
//     static async get(url: string) {
//         if (!url) {
//             return undefined
//         }
//         return await httpClient.execute(url, 'GET')
//     }
//     static async post(url: string, data?: any) {
//         if (!url) {
//             return undefined
//         }
//         return await httpClient.execute(url, 'POST', data)
//     }
//     static async head(url: string) {
//         if (!url) {
//             return undefined
//         }
//         return await httpClient.execute(url, 'HEAD')
//     }
//     static async execute(url: string, method: string, data?: any): Promise<Response> {
//         if (!url || !method) {
//             return undefined
//         }
//         const request: RequestInit = {
//             method: method,
//             mode: 'cors',
//             cache: 'no-cache',
//             credentials: 'same-origin',
//             redirect: 'follow',
//             referrer: 'no-referrer',
//             headers: {
//                 'Content-Type': (data ? 'application/json' : undefined)
//             },
//             body: (data ? JSON.stringify(data) : undefined)
//         }
//         return await fetch(url, request)
//     }
// }
