import Block from '../framework/Block';
import { BlockConstructor } from '../types/types';


export function render(
    block: Block | null,
    BlockClass: BlockConstructor,
    props: { rootQuery: HTMLElement; class: string },
) {
    if (!block) {
        block = new BlockClass(props);
        const rootQuery = props.rootQuery;
        rootQuery.innerHTML = '';
        if (block) rootQuery.appendChild(block.getContent());
    } else {
        block.show();
    }

    return block;
}
