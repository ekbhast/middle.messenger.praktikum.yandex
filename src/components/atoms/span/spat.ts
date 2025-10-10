import Block from '../../../framework/Block';
import { SpanProps, BlockProps } from '../../../types/types';
import { connect } from '../../../utils/connect';
import { Indexed } from '../../../types/types';

type Span2Props = SpanProps & BlockProps;
export default class Span extends Block {
    constructor(props?: Span2Props) {
        super({ ...props });
    }
    protected render(): string {
        return `
            <span class="{{class}}">{{text}}</span>
        `;
    }
}

function mapActiveChatToPropsAvatar(state: unknown): {
    text: string;
    class: string
} {
    const s = state as Indexed;

    return {
        class: 'chats__messages--userName',
        text: s.activChatUser?.first_name || '',
    };
}
export const ConnecteActiveChatSpan = connect(Span, mapActiveChatToPropsAvatar);

