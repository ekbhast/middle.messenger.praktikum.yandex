import Block from '../../../framework/Block';
import { router } from '../../../framework/Router';
import { DefaultClassProps } from '../../../types/types';
import Input from '../../atoms/input/input';
import Link from '../../atoms/link/link';
import Span from '../../atoms/span/spat';
import Dialog from '../../molecules/dialog/dialog';
import IconButton from '../../molecules/iconButton/iconButton';
import Message from '../../molecules/message/message';
import SearchFrom from '../../molecules/searchForm/searchForm';
import { ConnectedSearchDialog } from '../../molecules/searchDilog/searchDilog';
import { ConnecteActiveChatSpan } from '../../atoms/span/spat';
import { userController } from '../../../controllers/UserController';
import store from '../../../framework/Store';
import { ConnecteActiveChatAvatarIcon } from '../../atoms/avatarIcon/AvatarIcon';
import Button from '../../atoms/button/button';
import { chatsController } from '../../../controllers/ChatsController';


export default class ChatsFromBlock extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            Link: new Link({
                href: '/user-settings',
                class: 'chats__profileLink',
                text: 'Профиль',
                events: {
                    click: (e:Event) => {
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
                        store.set('searchIdValue', login);
                        console.log(store.getState());

                        if (!login) return;

                        try {
                            const user = await userController.getUserById(Number(login));
                            console.log('Пользователь найден:', user);
                            store.set('searchIdValue', '');
                            const visibleBlock = document.querySelector('.searchDilog') as HTMLElement;
                            visibleBlock.classList.remove('disable');
                        } catch (err) {
                            console.error('Ошибка поиска пользователя', err);
                        }
                    },
                },
            }),
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
            Dialog: new Dialog({
                class: 'dialog',
            }),
            NewChatButton: new Button({
                class: 'chat__message--newChatButton button__primary',
                label: 'Создать чат',
                type: 'button',
                events: {
                    click: async ()=>{
                        try {
                            const chats = await chatsController.createChat();
                            console.log('Чат создан', chats);
                        } catch (err) {
                            console.error('jошибка создания чата', err);
                        }
                    },
                },
            }),
            SearchDilog: new ConnectedSearchDialog({
                events: {
                    click: () => {
                        console.log('click');
                        store.set('activChatUser', store.getState().searchUser);
                        document.querySelector('.searchDilog')?.classList.add('disable');
                        document.querySelector('.chats__messages')?.classList.remove('disable');
                        console.log(store.getState());
                    },
                },
            }),
            AvatarIcon: new ConnecteActiveChatAvatarIcon({
                class: 'chats__messages--avatarIcon',
                imgSrc: '/src/assets/1648314277_5-kartinkof-club-p-yao-min-mem-5.jpg',
                classImg: 'avatarIcon__img',
            }),
            SpanMessagesUser: new ConnecteActiveChatSpan(),
            IconButtonMenu: new IconButton({
                class: 'chats__messages--buttonMenu',
                imgClass: 'chats__messages--buttonMenu',
                imgSrc: '/src/assets/chats__header--buttonMenu.png',
            }),
            IconButtonAttachment: new IconButton({
                class: 'chats__messages--attachmentButton',
                imgClass: 'chats__messages--buttonMenu',
                imgSrc: '/src/assets/attachment.png',
            }),
            IconButtonSend: new IconButton({
                class: 'chats__messages--sendButton',
                imgClass: 'chats__messages--buttonMenu',
                imgSrc: '/src/assets/sendArrow.png',
                events: {
                    submit: (e: Event) => {
                        e.preventDefault();
                        console.log('Отправка сообщения не реализована');
                    },
                },
            }),
            MessageIn: new Message({
                class: 'chats__messages-message',
                classMessage: 'chats__messages-message--inMessage',
                text: 'Собеседник',
                time: '14:25',
                classText: 'chats__messages-messageText',
                classTime: 'chats__messages-messageTime',
            }),
            MessageOut: new Message({
                class: 'chats__messages-message',
                classMessage: 'chats__messages-message--outMessage',
                text: 'Мое сообщение Мое сообщение Мое сообщение Мое сообщение Мое сообщение Мое сообщение Мое сообщение Мое сообщение Мое сообщение Мое сообщение Мое сообщение Мое сообщение',
                time: '13:40',
                classText: 'chats__messages-messageText',
                classTime: 'chats__messages-messageTime',
            }),
            SpanDate: new Span({
                class: 'chats__messages-date',
                text: '11 июля',
            }),
        });
    }
    protected componentDidMount(): void {
        (async () => {
            try {
                const chats = await chatsController.getChats();
                console.log('Чаты получены', chats);
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
                    <div class="chats__dilogs">
                    {{{SearchDilog}}}
                    <span class='chats__mychats'>Мои чаты</span>
                    {{{Dialog}}}
                    </div>
                </div>
                <div class="chats__messages disable">
                    <div class="chats__messages--header">
                        <div class="chats__messages--user">
                                {{{AvatarIcon}}}
                                {{{SpanMessagesUser}}}
                        </div>
                        <div class="chats__messages--headerMenu">
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

// {{{MessageIn;}}}
// {{{MessageOut;}}}
// {{{SpanDate;}}}
