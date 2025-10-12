import Block from '../../../framework/Block';
import { Indexed } from '../../../types/types';
import { connect } from '../../../utils/connect';
import { ChatUsersListProps } from '../../../types/types';
import Dialog from '../../molecules/dialog/dialog';
import store from '../../../framework/Store';
import { ChatProps } from '../../../types/types';
import { chatsController } from '../../../controllers/ChatsController';


export class ChatUsersList extends Block <ChatUsersListProps, {user: Dialog[]}> {
    constructor(props: ChatUsersListProps) {
        super({ ...props });
        this.lists.user = [];
    }

    protected componentDidMount(): void {
        (async () => {
            try {
                const chats = await chatsController.getUserChat(85890) as ChatProps[];
                store.set('chats', chats);
                const dialogBlocks = chats.map((chat) =>
                    new Dialog({
                        class: 'dialog',
                        events: {
                            click: () => {
                                console.log('тык', chat.id);
                            },
                        },
                        chatData: {
                            title: chat.title ?? 'Без названия',
                            lastMessage: chat.last_message ?? 'Сообщений нет',
                            avatar: chat.avatar ?? '/src/assets/default-avatar.jpg',
                            unreadCount: chat.unread_count ?? 0,
                            id: chat.id,
                        },
                    }),
                );
                this.lists.user = dialogBlocks;
            } catch (err) {
                console.error('Ошибка получения чатов', err);
            }
        })();
    }

    protected render(): string {
        console.log('Search users chat', this.lists.user);
        return `
        <div class="{{class}}">
            {{{user}}}
        </div>
    `;
    }
}

function mapStateToProps(state: unknown) {
    const s = state as Indexed;

    return {
        class: 'searchUsersChats disable',
    };
}

export const ConnectedChatUsersList = connect(ChatUsersList, mapStateToProps);
