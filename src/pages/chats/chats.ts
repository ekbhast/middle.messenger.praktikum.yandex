import ChatsTemplate from '../../components/templates/chatsTemplate/chatsTemplate';
import Block from '../../framework/Block';
import { DefaultClassProps } from '../../types/types';
import createFormEvents from '../../utils/fromEvents';


export default class Chats extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            ChatsTemplate: new ChatsTemplate({
                class: 'chats__template',
            }),
            events: createFormEvents(),
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
