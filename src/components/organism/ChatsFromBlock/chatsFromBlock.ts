import Block from '../../../framework/Block';
import { router } from '../../../framework/Router';
import { DefaultClassProps } from '../../../types/types';
import Input from '../../atoms/input/input';
import Link from '../../atoms/link/link';
import Dialog from '../../molecules/dialog/dialog';
import Button from '../../atoms/button/button';
import store from '../../../framework/Store';
import { chatsController } from '../../../controllers/ChatsController';
import { ChatProps } from '../../../types/types';
import { ConnectedSearchDialog } from '../../molecules/searchDilog/searchDilog';
import handleChatSelect from '../../../utils/handleChatSelect';
import { ConnecteActiveChatAvatarIcon } from '../../atoms/avatarIcon/AvatarIcon';
import { ConnecteActiveChatSpan } from '../../atoms/span/spat';
import IconButton from '../../molecules/iconButton/iconButton';
import ChatMenu from '../../molecules/chatMenu/chatMenu';
import SearchUserId from '../../molecules/searchUserId/searchUserId';
import { ConnectedChatUsersList } from '../../molecules/searchUsersChat/searchUsersChat';


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
                events: {
                    click: () => {
                        const chatMenu = document.querySelector('.chatMenu') as HTMLInputElement;
                        const overlay = document.querySelector('.chatMenu__overlay') as HTMLInputElement;
                        if (overlay) {
                            overlay.classList.toggle('disable');
                        }
                        if (chatMenu) {
                            chatMenu.classList.toggle('disable');
                        }
                    },
                },
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
            ChatMenu: new ChatMenu({
                class: 'chatMenu disable',
                events: {
                    click: (e: Event) => {
                        e.stopPropagation();
                        const chatMenu = document.querySelector('.chatMenu') as HTMLInputElement;
                        const overlay = document.querySelector('.chatMenu__overlay') as HTMLInputElement;
                        const searchUserId = document.querySelector('.searchUserId') as HTMLInputElement;
                        if (e.target === overlay) {
                            chatMenu?.classList.add('disable');
                            overlay.classList.add('disable');
                            searchUserId?.classList.add('disable');
                        }
                    },
                } }),
            SearchUserId: new SearchUserId({ class: 'searchUserId disable' }),
            SearchUsersChat: new ConnectedChatUsersList(),
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
                            id: chat.id,
                        },
                    }),
                );
                this.lists.dialogs = dialogBlocks;
                dialogBlocks.forEach((dialog) => {
                    const el = dialog.getContent();
                    if (el) {
                        el.addEventListener('click', () => {
                            handleChatSelect(dialog.props.chatData.id);
                        });
                    }
                });
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
