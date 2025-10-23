import { HTTPTransport } from './request';

describe('HTTPTransport', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let xhrMock: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let requests: any[];

    beforeEach(() => {
        requests = [];
        xhrMock = {
            open: jest.fn(),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            send: jest.fn(function(this: any) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-invalid-this
                requests.push(this);
            }),
            setRequestHeader: jest.fn(),
            onload: jest.fn(),
            onerror: jest.fn(),
            onabort: jest.fn(),
            ontimeout: jest.fn(),
            withCredentials: false,
            status: 200,
            response: '{"ok":true}',
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (global as any).XMLHttpRequest = jest.fn(() => xhrMock);
    });

    test('get() добавляет query параметры', async () => {
        const api = new HTTPTransport('https://api.test');
        const promise = api.get('/endpoint', { data: { a: 1, b: 'x' } });

        expect(xhrMock.open).toHaveBeenCalledWith('GET', 'https://api.test/endpoint?a=1&b=x');
        xhrMock.onload(); // триггерим onload
        await expect(promise).resolves.toEqual({ ok: true });
    });

    test('post() отправляет JSON', async () => {
        const api = new HTTPTransport('https://api.test');
        const data = { foo: 'bar' };
        const promise = api.post('/endpoint', { data });

        expect(xhrMock.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(xhrMock.send).toHaveBeenCalledWith(JSON.stringify(data));

        xhrMock.onload();
        await expect(promise).resolves.toEqual({ ok: true });
    });

    test('обрабатывает ошибку', async () => {
        const api = new HTTPTransport('https://api.test');
        xhrMock.status = 400;
        xhrMock.response = '{"error":"bad"}';
        const promise = api.get('/endpoint');

        xhrMock.onload();
        await expect(promise).rejects.toMatchObject({
            message: 'HTTP error: 400',
            status: 400,
            response: { error: 'bad' },
        });
    });
});
