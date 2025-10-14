import Block from '../../../framework/Block';
import { Indexed } from '../../../types/types';
import { connect } from '../../../utils/connect';
import { ChatUsersListProps } from '../../../types/types';
import Dialog from '../../molecules/dialog/dialog';
import { ChatProps } from '../../../types/types';
import { chatsController } from '../../../controllers/ChatsController';
import { ConnectedChatUsersListDilog } from '../../molecules/dialog/dialog';
import { DefaultClassProps, BlockProps } from '../../../types/types';
type ChatUsersList2Props = DefaultClassProps & BlockProps;
export class ChatUsersList extends Block <ChatUsersListProps, {user: Dialog[]}> {
    constructor(props?: ChatUsersList2Props) {
        super({ ...props });
        this.lists.user = [];
    }

    protected componentDidUpdate(_oldProps: ChatUsersListProps, newProps: ChatUsersListProps): boolean {
        if (newProps.activeChat) {
            (async () => {
                try {
                    const chats = await chatsController.getUserChat(newProps.activeChat) as ChatProps[];
                    const dialogBlocks = chats.map((chat) =>
                        new ConnectedChatUsersListDilog({
                            class: 'dialog',
                            chatData: {
                                title: chat.first_name ?? 'Без названия',
                                avatar: chat.avatar ?? '../../../src/assets/default-avatar.jpg',
                                unreadCount: chat.unread_count ?? 0,
                                id: chat.id,
                                type: 'searchUserChat',
                                activeChat: this.props.activeChat,
                            },
                        }),
                    );
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (this.lists as any).user = dialogBlocks;
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
