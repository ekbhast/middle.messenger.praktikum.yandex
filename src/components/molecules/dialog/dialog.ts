import Block from '../../../framework/Block';
import Span from '../../atoms/span/spat';
import H2 from '../../atoms/headers/h2/h2';
import AvatarIcon from '../../atoms/avatarIcon/AvatarIcon';
import { baseUrlResourse } from '../../../api/baseUrls';
import Button from '../../atoms/button/button';
import { connect } from '../../../utils/connect';
import { chatsController } from '../../../controllers/ChatsController';
import { closeModal } from '../../../utils/closeModalAll';
import { Indexed } from '../../../types/types';
import { DefaultClassProps, BlockProps } from '../../../types/types';


type Dilog2Props = DefaultClassProps & BlockProps;


export default class Dialog extends Block {
    constructor(props?: Dilog2Props) {
        super({
            ...props,
            AvatarIcon: new AvatarIcon({
                class: 'avatarIcon',
                imgSrc: props?.chatData.avatar ? baseUrlResourse + props?.chatData.avatar : '/static/assets//default-avatar.jpg',
                classImg: 'avatarIcon__img',
            }),
            H2: new H2({
                class: 'dialog__dialogName',
                label: props?.chatData.title,
            }),
            SpanLastMessageTime: new Span({
                class: 'dialog__lastMessageTime',
                text: '12:00',
            }),
            SpanTextMessage: new Span({
                class: 'dialog__textMessage',
                text: props?.chatData.lastMessage?.content || '',
            }),
            SpanMessageCount: new Span({
                class: 'dialog__newMessageCount--text',
                text: String(props?.chatData.unreadCount),
            }),
            deleteUserButton: new Button({
                type: 'button',
                label: 'Удалить',
                class: 'button__primary deleteUserButton',
                events: {
                    click: async (e:Event)=>{
                        if (props?.chatData.id && props.chatData.activeChat) {
                            try {
                                const deleteUser = await chatsController.deleteUserFromChat({
                                    users: [Number(props.chatData.id)],
                                    chatId: Number(props.chatData.activeChat),
                                });
                                console.log('юзер удален', deleteUser);
                                closeModal(e);
                            } catch (err) {
                                console.log('Удалить не удалось', err);
                            }
                        } else {
                            console.log('Для удаления пользователя нет необходимых данных');
                        }
                    },
                },
            }),
        });
    }
    getChatData() {
        return this.props.chatData;
    }
    protected render(): string {
        if ((this.props.chatData as { type: string }).type === 'searchUserChat') {
            return `
        <div class="{{class}}">
            <div class="dialog__block">
                <div class="dialog__block--avatar">
                    {{{AvatarIcon}}}
                </div>
                <div class="dialog__block--message">
                    <div class="dialog__block--header">
                        {{{H2}}}
                    </div>
                            
                </div>
                {{{deleteUserButton}}}   
            </div>    
        </div>
        `;
        } else {
            return `
        <div class="{{class}}">
            <div class="dialog__block">
                <div class="dialog__block--avatar">
                    {{{AvatarIcon}}}
                </div>
                <div class="dialog__block--message">
                    <div class="dialog__block--header">
                        {{{H2}}}
                        {{{SpanLastMessageTime}}}
                    </div>
                    <div class="dialog__message">
                        <div class="dialog__block--textMessage">
                            {{{SpanTextMessage}}}
                        </div>
                        <div class="dialog__newMessageCount">
                            {{{SpanMessageCount}}}
                        </div>
                    </div>            
                </div>
            </div>    
        </div>
        `;
        }
    }
}
function mapStateToProps(state: unknown) {
    const s = state as Indexed;

    return {
        activeChat: s?.activeChatId||'',
    };
}

export const ConnectedChatUsersListDilog = connect(Dialog, mapStateToProps);
