export enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export type Options = {
    method?: METHODS;
    data?: unknown;
    timeout?: number;
};

export type HTTPMethod = <R = unknown>(url: string, options?: Options) => Promise<R>;

function queryStringify(data: Record<string, string | number | boolean>): string {
    if (!data || Object.keys(data).length === 0) return '';
    return (
        '?' +
        Object.entries(data)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&')
    );
}

export class HTTPTransport {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    // Методы для запросов
    get: HTTPMethod = (url, options) =>
        this.request(this.baseUrl + url, { ...(options || {}), method: METHODS.GET }, options?.timeout);

    post: HTTPMethod = (url, options) =>
        this.request(this.baseUrl + url, { ...(options || {}), method: METHODS.POST }, options?.timeout);

    put: HTTPMethod = (url, options) =>
        this.request(this.baseUrl + url, { ...(options || {}), method: METHODS.PUT }, options?.timeout);

    delete: HTTPMethod = (url, options) =>
        this.request(this.baseUrl + url, { ...(options || {}), method: METHODS.DELETE }, options?.timeout);

    // Основной метод запроса
    private request<R = unknown>(url: string, options: Options = { method: METHODS.GET }, timeout?: number): Promise<R> {
        const { method = METHODS.GET, data } = options;

        return new Promise<R>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            let requestUrl = url;

            // Для GET добавляем query string
            if (method === METHODS.GET && data && typeof data === 'object') {
                requestUrl += queryStringify(data as Record<string, string | number | boolean>);
            }

            xhr.open(method, requestUrl);
            xhr.withCredentials = true; // для сессий и cookie

            xhr.onload = () => {
                let response: any = xhr.response;

                try {
                    response = xhr.response ? JSON.parse(xhr.response) : null;
                } catch {
                    // оставляем response как строку, если это не JSON
                }

                if (xhr.status === 200) {
                    resolve(response as R); // успех
                } else {
                    const error = new Error(`HTTP error: ${xhr.status}`) as any;
                    error.status = xhr.status;
                    error.response = response;
                    reject(error); // отказ
                }
            };
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (timeout) {
                xhr.timeout = timeout;
            }

            if (method !== METHODS.GET && data) {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(data));
            } else {
                xhr.send();
            }
        });
    }
}
