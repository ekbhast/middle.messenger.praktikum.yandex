import Block from '../../../framework/Block';
import { Indexed } from '../../../types/types';
import { connect } from '../../../utils/connect';
import { ChatUsersListProps } from '../../../types/types';
import Dialog from '../../molecules/dialog/dialog';
import store from '../../../framework/Store';
import { ChatProps } from '../../../types/types';
import { chatsController } from '../../../controllers/ChatsController';
import { ConnectedChatUsersListDilog } from '../../molecules/dialog/dialog';


export class ChatUsersList extends Block <ChatUsersListProps, {user: Dialog[]}> {
    constructor(props: ChatUsersListProps) {
        super({ ...props });
        this.lists.user = [];
    }

    protected componentDidUpdate(oldProps: ChatUsersListProps, newProps: ChatUsersListProps): boolean {
        if (newProps.activeChat) {
            (async () => {
                try {
                    const chats = await chatsController.getUserChat(newProps.activeChat) as ChatProps[];
                    const dialogBlocks = chats.map((chat) =>
                        new ConnectedChatUsersListDilog({
                            class: 'dialog',
                            chatData: {
                                title: chat.first_name ?? 'Без названия',
                                avatar: chat.avatar ?? '/src/assets/default-avatar.jpg',
                                unreadCount: chat.unread_count ?? 0,
                                id: chat.id,
                                type: 'searchUserChat',
                                activeChat: this.props.activeChat,
                            },
                        }),
                    );
                    this.lists.user = dialogBlocks;
                } catch (err) {
                    console.error('Ошибка получения чатов', err);
                }
            })();
        }
        return true;
    }

    protected render(): string {
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
        activeChat: s?.activeChatId||'',
    };
}

export const ConnectedChatUsersList = connect(ChatUsersList, mapStateToProps);
