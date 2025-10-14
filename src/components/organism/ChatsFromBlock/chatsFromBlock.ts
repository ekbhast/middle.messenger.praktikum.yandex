import Block from '../../../framework/Block';
import { router } from '../../../framework/Router';
import { DefaultClassProps, ChatProps, BlockProps } from '../../../types/types';
import Input from '../../atoms/input/input';
import Link from '../../atoms/link/link';
import Dialog from '../../molecules/dialog/dialog';
import Button from '../../atoms/button/button';
import store from '../../../framework/Store';
import { chatsController } from '../../../controllers/ChatsController';
import { ConnectedSearchDialog } from '../../molecules/searchDilog/searchDilog';
import handleChatSelect from '../../../utils/handleChatSelect';
import { ConnecteActiveChatAvatarIcon } from '../../atoms/avatarIcon/AvatarIcon';
import { ConnecteActiveChatSpan } from '../../atoms/span/spat';
import IconButton from '../../molecules/iconButton/iconButton';
import ChatMenu from '../../molecules/chatMenu/chatMenu';
import SearchUserId from '../../molecules/searchUserId/searchUserId';
import { ConnectedChatUsersList } from '../../molecules/searchUsersChat/searchUsersChat';
import Message from '../../molecules/message/message';
import { ChatSocket } from '../../../api/chatSocket';
import { baseUrl } from '../../../api/baseUrls';
import { connect } from '../../../utils/connect';
import { Indexed } from '../../../types/types';
interface MessageType {
    chat_id: number;
    user_id: number;
    content: string;
    time: string; // ISO-строка
}

type ChatsFromBlock2Props = ChatsFromBlockProps & BlockProps;
interface ChatsFromBlockProps extends DefaultClassProps {
    dialogs?: Dialog[];
    Link: Link;
    MessageInput: Input;
    newChatInput: Input;
    NewChatButton: Button;
    IconButtonMenu: IconButton;
    IconButtonAttachment: IconButton;
    IconButtonSend: IconButton;
    messageOut: Message;
    ChatMenu: ChatMenu;
    SearchUserId: SearchUserId;
}


export default class ChatsFromBlock extends Block<ChatsFromBlock2Props, { dialogs: Dialog[] }> {
    socket: ChatSocket | null = null;

    constructor(props?: DefaultClassProps) {
        super({
            ...props,
            Link: new Link({
                href: '/user-settings',
                class: 'chats__profileLink',
                text: 'Профиль',
                events: {
                    click: (e: Event) => {
                        e.preventDefault();
                        router.go('/settings');
                    },
                },
            }),
            SearchDilog: new ConnectedSearchDialog(),
            MessageInput: new Input({
                class: 'chats__message--inputMessage',
                placeholder: 'Сообщение',
                type: 'text',
                name: 'message',
            }),
            newChatInput: new Input({
                placeholder: store.getState().newNameChat || 'Введите название чата',
                events: {
                    input: (e: Event) => {
                        store.set('newNameChat', (e.target as HTMLInputElement).value);
                    },
                },
            }),
            NewChatButton: new Button({
                class: 'chat__message--newChatButton button__primary',
                label: 'Создать чат',
                type: 'button',
                events: {
                    click: async () => {
                        try {
                            const newChat = await chatsController.createChat(store.getState().newNameChat);
                            await chatsController.getChats();
                            console.log('Чат создан', newChat);
                        } catch (err) {
                            console.error('Ошибка создания чата', err);
                        }
                    },
                },
            }),
            AvatarIcon: new ConnecteActiveChatAvatarIcon({
                class: 'chats__messages--avatarIcon',
                imgSrc: 'assets/default-avatar.jpg',
                classImg: 'avatarIcon__img',
            }),
            SpanMessagesUser: new ConnecteActiveChatSpan(),
            IconButtonMenu: new IconButton({
                class: 'chats__messages--buttonMenu',
                imgClass: 'chats__messages--buttonMenu',
                imgSrc: 'assets/chats__header--buttonMenu.png',
                events: {
                    click: () => {
                        const chatMenu = document.querySelector('.chatMenu') as HTMLElement;
                        const overlay = document.querySelector('.chatMenu__overlay') as HTMLElement;
                        chatMenu?.classList.toggle('disable');
                        overlay?.classList.toggle('disable');
                    },
                },
            }),
            IconButtonAttachment: new IconButton({
                class: 'chats__messages--attachmentButton',
                imgClass: 'chats__messages--buttonMenu',
                imgSrc: 'assets/attachment.png',
            }),
            IconButtonSend: new IconButton({
                class: 'chats__messages--sendButton',
                imgClass: 'chats__messages--buttonMenu',
                imgSrc: 'assets/sendArrow.png',
            }),
            messageOut: new Message({
                class: 'chats__messages-messageText',
                classMessage: 'chats__messages-message chats__messages-message--inMessage',
                text: '',
            }),
            ChatMenu: new ChatMenu({
                class: 'chatMenu disable',
                events: {
                    click: (e: Event) => {
                        e.stopPropagation();
                        const chatMenu = document.querySelector('.chatMenu') as HTMLElement;
                        const overlay = document.querySelector('.chatMenu__overlay') as HTMLElement;
                        const searchUserId = document.querySelector('.searchUserId') as HTMLElement;
                        const searchUsersChats = document.querySelector('.searchUsersChats') as HTMLElement;
                        if (e.target === overlay) {
                            chatMenu?.classList.add('disable');
                            overlay?.classList.add('disable');
                            searchUserId?.classList.add('disable');
                            searchUsersChats?.classList.add('disable');
                        }
                    },
                },
            }),
            SearchUserId: new SearchUserId({ class: 'searchUserId disable' }),
            SearchUsersChat: new ConnectedChatUsersList(),
        });

        this.lists.dialogs = [];
    }
    protected async componentDidMount(): Promise<void> {
        try {
            const chats = await chatsController.getChats();

            if (chats && chats.length > 0) {
                this.renderChats(chats);
            }

            console.log('Чаты загружены при монтировании');
        } catch (err) {
            console.error('Ошибка при загрузке чатов:', err);
        }
    }

    protected componentDidUpdate( _oldProps: ChatsFromBlockProps,
        newProps: ChatsFromBlockProps): boolean {
    // Обновляем чаты только если они изменились
        if (newProps.chats && newProps.chats !== _oldProps.chats) {
            this.renderChats(newProps.chats);
        }
        return true;
    }

    // 💬 Вынесено в отдельный метод — универсальный рендер списка чатов
    private renderChats(chats: ChatProps[]): void {
        const dialogBlocks = chats.map((chat) => {
            const lastMessageText = chat.last_message?.content || 'Сообщений нет';
            const unreadCount = chat.unread_count || 0;

            return new Dialog({
                events: {
                    click: () => {
                        const activeChat = (chatId: number) => {
                            const state = store.getState();
                            if (state.activeChatId === chatId) {
                                handleChatSelect(chatId);
                            } else {
                                handleChatSelect(chatId);
                                this.connectToChat(chatId);
                            }
                        };
                        activeChat(chat.id);
                    },
                },
                class: 'dialog',
                chatData: {
                    ...chat,
                    lastMessage: {
                        content: lastMessageText,
                        time: chat.last_message?.time,
                        user: chat.last_message?.user,
                    },
                    unreadCount,
                },
            });
        });

        this.lists.dialogs = dialogBlocks;
    }


    async connectToChat(chatId: number | string) {
        const chatContainer = document.querySelector('.chats__messages--chat');
        if (chatContainer) chatContainer.innerHTML = '';
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }

        store.set('activeChatId', chatId);

        try {
            const response = await fetch(`${baseUrl}/chats/token/${chatId}`, {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
            });

            if (!response.ok) throw new Error(`Не удалось получить токен: ${response.status}`);

            const data = await response.json();
            const token = data.token;
            if (!token) throw new Error('Токен не получен');
            const getStore = store.getState();
            const userId = getStore.user.id;

            this.socket = new ChatSocket(userId, chatId, token);

            this.socket.onOpen = () => console.log('Сокет открыт для чата', chatId);
            this.socket.onMessage = (msg) => {
                if (Array.isArray(msg)) {
                    msg.reverse().forEach((m) => this.addMessageToChat(m));
                } else {
                    this.addMessageToChat(msg);
                }
            };
            this.socket.onClose = (event: CloseEvent) =>
                console.log('Сокет закрыт', event.code, event.reason);
            this.socket.onError = (err) => console.error('Ошибка сокета', err);

            this.socket.connect();
        } catch (err) {
            console.error('Ошибка подключения к чату:', err);
        }
    }

    handleSubmit(e: Event) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const inputEl = form.querySelector<HTMLInputElement>('.chats__message--inputMessage');
        const text = inputEl?.value.trim();
        if (!text || !this.socket) return;

        this.socket.sendMessage(text);

        if (inputEl) inputEl.value = '';
    }

    addMessageToChat(msg: MessageType) {
        const getStore = store.getState();
        const chatContainer = document.querySelector('.chats__messages--chat');
        if (!chatContainer) return;
        const formattedTime = new Date(msg.time).toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
        });

        const messageBlock = new Message({
            class: 'chats__messages-messageText',
            classMessage:
            msg.user_id === getStore.user.id ?
                'chats__messages-message chats__messages-message--inMessage':
                'chats__messages-message chats__messages-message--outMessage',
            text: msg.content,
            time: formattedTime,
        });

        chatContainer.appendChild(messageBlock.getContent()!);
    }

    protected componentWillUnmount(): void {
        if (this.socket) this.socket.disconnect();
    }

    protected render(): string {
        return `
           <div class="chats__fromBlock">
                <div class="chats__chats">
                    <div class="chats__profile">
                        {{{Link}}}
                    </div>
                    {{{newChatInput}}}
                    {{{NewChatButton}}}
                    <div class="chats__dialogs">
                        <span class='chats__mychats'>Мои чаты</span>
                        {{{dialogs}}}
                    </div>
                </div>
                <div class="chats__messages disable">
                       <div class="chats__messages--header">
                        <div class="chats__messages--user">
                                {{{AvatarIcon}}}
                                {{{SpanMessagesUser}}}
                        </div>
                        <div class="chats__messages--headerMenu">
                            {{{ChatMenu}}}
                            {{{SearchUserId}}}
                            {{{SearchUsersChat}}}
                            {{{IconButtonMenu}}}
                        </div>
                    </div>
                    <div class="chats__messages--chat">
                    </div>
                    <form class="chats__messages--actions">
                        {{{IconButtonAttachment}}}
                        {{{MessageInput}}}
                        {{{IconButtonSend}}}
                    </form>
                </div>
            </div>
        `;
    }
}

function mapUserChatsToProps(state: unknown): {
    chats: [];
} {
    const s = state as Indexed;

    return {
        chats: s.chats,
    };
}

export const ConnecteSearchUserAvatarIcon = connect(ChatsFromBlock, mapUserChatsToProps);

