import ChatsTemplate from '../../components/templates/chatsTemplate/chatsTemplate';
import Block from '../../framework/Block';
import { DefaultClassProps } from '../../types/types';
import { validateInput } from '../../utils/fromEvents';
import { validateForm } from '../../utils/validateForm';
import { sendMessage } from '../../utils/sendMessages';


export default class Chats extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            ChatsTemplate: new ChatsTemplate({
                class: 'chats__template',
            }),
            events: {
                focusout: (e:Event) => validateInput(e),
                submit: (e:Event)=>{
                    e.preventDefault();
                    console.log('submit form');
                    sendMessage(validateForm(e).formData.message as string);
                },
            },
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
