import Block from '../../../framework/Block';
import { DefaultClassProps } from '../../../types/types';
import RegFromBlock from '../../organism/regFromBlock/regFromBlock';

export default class RegTemplate extends Block {
    constructor(props: DefaultClassProps) {
        super({ ...props,
            RegFromBlock: new RegFromBlock({
                class: 'reg__fromBlock',
            }),
        });
    }
    protected render(): string {
        return `
            <div class="{{class}}">
                {{{RegFromBlock}}}
            </div>
        `;
    }
}
