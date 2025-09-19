enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  method?: METHODS;
  data?: any;
  timeout?: number;
};

type HTTPMethod = <R = unknown>(url: string, options?: Options) => Promise<R>;

function queryStringify(data: Record<string, any>): string {
    if (!data) return '';
    return (
        '?' +
    Object.entries(data)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&')
    );
}

export class HTTPTransport {
    get: HTTPMethod = (url, options = {}) =>
        this.request(url, { ...options, method: METHODS.GET }, options.timeout);

    put: HTTPMethod = (url, options = {}) =>
        this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

    post: HTTPMethod = (url, options = {}) =>
        this.request(url, { ...options, method: METHODS.POST }, options.timeout);

    delete: HTTPMethod = (url, options = {}) =>
        this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

    private request<R = unknown>(url: string, options: Options = { method: METHODS.GET }, timeout?: number): Promise<R> {
        const { method = METHODS.GET, data } = options;

        return new Promise<R>((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            let requestUrl = url;
            if (method === METHODS.GET && data) {
                requestUrl += queryStringify(data);
            }

            xhr.open(method, requestUrl);

            xhr.onload = () => {
                try {
                    resolve(JSON.parse(xhr.response) as R);
                } catch {
                    resolve(xhr.response as unknown as R);
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
