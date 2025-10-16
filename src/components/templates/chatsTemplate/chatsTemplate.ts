import Block from '../../../framework/Block';
import { DefaultClassProps } from '../../../types/types';
import { ConnecteSearchUserAvatarIcon } from '../../organism/ChatsFromBlock/chatsFromBlock';

export default class ChatsTemplate extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            ChatsFromBlock: new ConnecteSearchUserAvatarIcon({
                class: 'chats__fromBlock',
            }),
        });
    }

    protected render(): string {
        return `
            <div class="chats__template">
                {{{ChatsFromBlock}}}
            </div>
        `;
    }
}
