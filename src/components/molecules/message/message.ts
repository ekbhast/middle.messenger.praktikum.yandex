import Block from '../../../framework/Block';
import { MessageProps } from '../../../types/types';

export default class Message extends Block {
    constructor(props: MessageProps) {
        super({ ...props });
    }

    protected render(): string {
        return `
        <div class="{{class}} {{classMessage}}">
            <span class="chats__messages-messageText">{{text}}</span>
            <span class="chats__messages-messageTime">{{time}}</span>
        </div>
        `;
    }
}
