import Block from '../../../../framework/Block';
import { HeaderProps, BlockProps } from '../../../../types/types';
import { connect } from '../../../../utils/connect';
import { Indexed } from '../../../../types/types';
type H2Props = HeaderProps & BlockProps;
export default class H2 extends Block {
    constructor(props?: H2Props) {
        super({ ...props });
    }
    protected render(): string {
        return `
        <h2 class="{{class}}">{{label}}</h2>
        `;
    }
}

function mapSearchUserToProps(state: unknown) {
    const s = state as Indexed;

    return {
        label: s.searchUser?.display_name || 'Неизвестный пользователь',
        class: 'dialog__dialogName',
    };
}

export const ConnecteSearchUserH2 = connect(H2, mapSearchUserToProps);
