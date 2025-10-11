import Block from '../../../framework/Block';
import { InputProps, BlockProps } from '../../../types/types';
import { connect } from '../../../utils/connect';
import { Indexed } from '../../../types/types';
type Input2Props = InputProps & BlockProps;

export default class Input extends Block {
    constructor(props?: Input2Props) {
        super(({ ...props }));
    }

    protected render(): string {
        return `
            <input class="{{class}}"placeholder="{{placeholder}} " id="{{id}}" type="{{type}}" name="{{name}}" autocomplete="{{suggested}}" value={{value}} >
        `;
    }
}

function mapUserToProps(state: unknown) {
    const s = state as Indexed;
    return {
        value: s.searchIdValue,
    };
}

export const ConnectedSearchIdValue = connect(Input, mapUserToProps);
