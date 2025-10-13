export class ChatSocket {
    userId: number | string;
    chatId: number | string;
    token: string;
    socket: WebSocket | null = null;
    pingInterval: number | null = null;

    onMessage: ((data: any) => void) | null = null;
    onOpen: (() => void) | null = null;
    onClose: ((event: CloseEvent) => void) | null = null;
    onError: ((err: any) => void) | null = null;

    constructor(userId: number | string, chatId: number | string, token: string) {
        this.userId = userId;
        this.chatId = chatId;
        this.token = token;
    }

    connect() {
        if (!this.token) throw new Error('Token required for connecting');

        this.socket = new WebSocket(
            `wss://ya-praktikum.tech/ws/chats/${this.userId}/${this.chatId}/${this.token}/`,
        );

        this.socket.addEventListener('open', () => {
            console.log('✅ WebSocket подключен');
            this.startPing();
            this.getOld(0);
            if (this.onOpen) this.onOpen();
        });

        this.socket.addEventListener('message', (event) => {
            try {
                const data = JSON.parse(event.data);
                this.handleMessage(data);
            } catch (err) {
                console.error('Ошибка при парсинге сообщения:', err);
            }
        });

        this.socket.addEventListener('error', (err) => {
            console.error('Ошибка WebSocket:', err);
            if (this.onError) this.onError(err);
        });

        this.socket.addEventListener('close', (event) => {
            console.warn('⚠️ Соединение закрыто', event.code, event.reason);
            this.stopPing();
            if (this.onClose) this.onClose(event);
        });
    }

    handleMessage(data: any) {
        if (Array.isArray(data)) {
            if (this.onMessage) this.onMessage(data);
            return;
        }

        if (data.type === 'message' && this.onMessage) {
            this.onMessage(data);
        }
    }

    sendMessage(text: string) {
        this.send({ type: 'message', content: text });
    }

    getOld(offset: number) {
        this.send({ type: 'get old', content: String(offset) });
    }

    startPing() {
        this.stopPing();
        this.pingInterval = window.setInterval(() => {
            this.send({ type: 'ping' });
        }, 5000);
    }

    stopPing() {
        if (this.pingInterval) {
            clearInterval(this.pingInterval);
            this.pingInterval = null;
        }
    }

    send(data: any) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        } else {
            console.warn('Попытка отправить сообщение при закрытом соединении');
        }
    }

    disconnect() {
        if (this.socket) {
            this.stopPing();
            this.socket.close();
            this.socket = null;
            console.log('Соединение закрыто вручную');
        }
    }

    reconnect() {
        console.log('🔄 Переподключение...');
        this.disconnect();
        this.connect();
    }
}
