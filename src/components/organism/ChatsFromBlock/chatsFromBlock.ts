import Block from '../../../framework/Block';
import { router } from '../../../framework/Router';
import { DefaultClassProps } from '../../../types/types';
import Input from '../../atoms/input/input';
import Link from '../../atoms/link/link';
import Dialog from '../../molecules/dialog/dialog';
import Button from '../../atoms/button/button';
import SearchFrom from '../../molecules/searchForm/searchForm';
import store from '../../../framework/Store';
import { userController } from '../../../controllers/UserController';
import { chatsController } from '../../../controllers/ChatsController';
import { ChatProps } from '../../../types/types';
import { ConnectedSearchDialog } from '../../molecules/searchDilog/searchDilog';

export default class ChatsFromBlock extends Block<DefaultClassProps, { dialogs: Dialog[] }> {
    constructor(props: DefaultClassProps) {
        super({
            ...props,
            Link: new Link({
                href: '/user-settings',
                class: 'chats__profileLink',
                text: 'Профиль',
                events: {
                    click: (e: Event) => {
                        e.preventDefault();
                        router.go('/user-settings');
                    },
                },
            }),
            SearchForm: new SearchFrom({
                class: 'chats__search',
                events: {
                    submit: async (e: Event) => {
                        e.preventDefault();
                        const inputEl = document.getElementById('search-input') as HTMLInputElement;
                        const login = inputEl?.value.trim();
                        if (!login) return;

                        try {
                            const user = await userController.getUserById(Number(login));
                            console.log('Пользователь найден:', user);
                            store.set('searchIdValue', '');
                            document.querySelector('.searchDilog')?.classList.remove('disable');
                        } catch (err) {
                            console.error('Ошибка поиска пользователя', err);
                        }
                    },
                },
            }),
            SearchDilog: new ConnectedSearchDialog(),
            MessageInput: new Input({
                class: 'chats__message--inputMessage',
                placeholder: 'Сообщение',
                type: 'text',
                name: 'message',
                events: {
                    submit: (e: Event) => {
                        e.preventDefault();
                        console.log('Отправка сообщения не реализована');
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
                            const newChat = await chatsController.createChat();
                            console.log('Чат создан', newChat);
                        } catch (err) {
                            console.error('Ошибка создания чата', err);
                        }
                    },
                },
            }),
        });

        this.lists.dialogs = [];
    }

    protected componentDidMount(): void {
        (async () => {
            try {
                const chats = await chatsController.getChats() as ChatProps[];
                const dialogBlocks = chats.map((chat) =>
                    new Dialog({
                        class: 'dialog',
                        chatData: {
                            title: chat.title ?? 'Без названия',
                            lastMessage: chat.last_message ?? 'Сообщений нет',
                            avatar: chat.avatar ?? '/src/assets/default-avatar.jpg',
                            unreadCount: chat.unread_count ?? 0,
                        },
                    }),
                );

                this.lists.dialogs = dialogBlocks;

                this.setProps({ dialogs: dialogBlocks });
            } catch (err) {
                console.error('Ошибка получения чатов', err);
            }
        })();
    }

    protected render(): string {
        return `
           <div class="chats__fromBlock">
                <div class="chats__chats">
                    <div class="chats__profile">
                        {{{Link}}}
                    </div>
                    {{{SearchForm}}}
                    {{{NewChatButton}}}
                    <div class="chats__dialogs">
                    {{{SearchDilog}}}
                        <span class='chats__mychats'>Мои чаты</span>
                        {{{dialogs}}}
                    </div>
                </div>
                <div class="chats__messages disable">
                    <!-- Здесь можно оставить логику сообщений -->
                </div>
            </div>
        `;
    }
}
