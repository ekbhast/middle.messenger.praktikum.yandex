import { render } from '../utils/render';
import Block from './Block';
import { BlockConstructor } from '../types/types';


export class Route {
    private _pathname: string;
    private _blockClass: BlockConstructor;
    private _block: Block | null;
    private _props: { rootQuery: HTMLElement; class: string };

    constructor(pathname: string, view: BlockConstructor, props: { rootQuery: HTMLElement; class: string }) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string): boolean {
        return pathname === this._pathname;
    }

    render() {
        this._block = render(this._block, this._blockClass, this._props);
    }
}
