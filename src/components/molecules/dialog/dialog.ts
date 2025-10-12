import Block from '../../../framework/Block';
import Span from '../../atoms/span/spat';
import H2 from '../../atoms/headers/h2/h2';
import AvatarIcon from '../../atoms/avatarIcon/AvatarIcon';
import { baseUrlResourse } from '../../../api/baseUrls';
import { DialogProps } from '../../../types/types';


export default class Dialog extends Block {
    constructor(props: DialogProps) {
        super({
            ...props,
            AvatarIcon: new AvatarIcon({
                class: 'avatarIcon',
                imgSrc: baseUrlResourse + props.chatData.avatar,
                classImg: 'avatarIcon__img',
            }),
            H2: new H2({
                class: 'dialog__dialogName',
                label: props.chatData.title,
            }),
            SpanLastMessageTime: new Span({
                class: 'dialog__lastMessageTime',
                text: '12:00',
            }),
            SpanTextMessage: new Span({
                class: 'dialog__textMessage',
                text: props.chatData.lastMessage,
            }),
            SpanMessageCount: new Span({
                class: 'dialog__newMessageCount--text',
                text: String(props.chatData.unreadCount),
            }),
        });
    }
    protected render(): string {
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
