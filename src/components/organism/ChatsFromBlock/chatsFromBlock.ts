import Block from '../../../framework/Block';
import { DefaultClassProps } from '../../../types/types';
import AvatarIcon from '../../atoms/avatarIcon/AvatarIcon';
import Input from '../../atoms/input/input';
import Link from '../../atoms/link/link';
import Span from '../../atoms/span/spat';
import Dialog from '../../molecules/dialog/dialog';
import IconButton from '../../molecules/iconButton/iconButton';
import Message from '../../molecules/message/message';

export default class ChatsFromBlock extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            Link: new Link({
                href: 'user-settings',
                class: 'chats__profileLink',
                text: 'Профиль',
            }),
            SearchInput: new Input({
                class: 'chats__searchInput',
                placeholder: 'Поиск',
                id: 'search-input',
                type: 'text',
                name: 'search-input',
            }),
            MessageInput: new Input({
                class: 'chats__message--inputMessage',
                placeholder: 'Сообщение',
                type: 'text',
                name: 'message',
            }),
            Dialog: new Dialog({
                class: 'dialog',
            }),
            AvatarIcon: new AvatarIcon({
                class: 'chats__messages--avatarIcon',
                imgSrc: '/src/assets/1648314277_5-kartinkof-club-p-yao-min-mem-5.jpg',
                classImg: 'avatarIcon__img',
            }),
            SpanMessagesUser: new Span({
                class: 'chats__messages--userName',
                text: 'Андрей',
            }),
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

    protected render(): string {
        return `
           <div class="chats__fromBlock">
                <div class="chats__chats">
                    <div class="chats__profile">
                    {{{Link}}}
                    </div>
                    <div class="chats__search">
                        <img src="/src/assets/search_icon.svg" alt="icon" class="chats__search--icon" />
                        {{{SearchInput}}}
                    </div>
                    <div class="chats__dilogs">
                        {{{Dialog}}}
                    </div>
                </div>
                <div class="chats__messages">
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
                        {{{MessageIn}}}
                        {{{MessageOut}}}
                        {{{SpanDate}}}
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
