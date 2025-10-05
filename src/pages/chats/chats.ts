import ChatsTemplate from '../../components/templates/chatsTemplate/chatsTemplate';
import Block from '../../framework/Block';
import { DefaultClassProps } from '../../types/types';


export default class Chats extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            ChatsTemplate: new ChatsTemplate({
                class: 'chats__template',
            }),
        });
    }

    protected render(): string {
        return `
            <main class="page page__chats">
                {{{ChatsTemplate}}}
            </main>
        `;
    }
}
