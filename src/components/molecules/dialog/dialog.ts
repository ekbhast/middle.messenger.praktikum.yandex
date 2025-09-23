import Block from '../../../framework/Block';
import { DefaultClassProps } from '../../../types/types';
import AvatarIcon from '../../atoms/avatarIcon/AvatarIcon';
import H2 from '../../atoms/headers/h2/h2';
import Span from '../../atoms/span/spat';

export default class Dialog extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            AvatarIcon: new AvatarIcon({
                class: 'avatarIcon',
                imgSrc: '/src/assets/1648314277_5-kartinkof-club-p-yao-min-mem-5.jpg',
                classImg: 'avatarIcon__img',
            }),
            H2: new H2({
                class: 'dialog__dialogName',
                label: 'Андрей',
            }),
            SpanLastMessageTime: new Span({
                class: 'dialog__lastMessageTime',
                text: '10:42',
            }),
            SpanTextMessage: new Span({
                class: 'dialog__textMessage',
                text: 'Миллионы россиян ежедневно проводят десятки часов свое...',
            }),
            SpanMessageCount: new Span({
                class: 'dialog__newMessageCount--text',
                text: '4',
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
