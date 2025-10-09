import EventBus, { EventCallback } from './EventBus';
import Handlebars from 'handlebars';
import { v4 as uuidv4 } from 'uuid';

export interface BlockProps {
  events?: Record<string, (event: Event) => void>;
  attr?: Record<string, string>;
  [key: string]: unknown;
}
export default class Block<
  P extends BlockProps = BlockProps,
// Используем {} как дефолтное значение для generic L.
// eslint ругался на empty object type, но в данном случае это безопасно,
// потому что мы указываем тип через Record<string, Array<...>>.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  L extends Record<string, Array<Block | string | number | HTMLElement>> = {}
> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    } as const;

    protected _element: HTMLElement | null = null;
    protected _id: string = uuidv4();
    protected props: P;
    protected children: Record<string, Block> = {};
    protected lists: L;
    protected eventBus: () => EventBus;

    constructor(propsWithChildren: P & Partial<L> = {} as P & Partial<L>) {
        const eventBus = new EventBus();
        const { props, children, lists } = this._getChildrenPropsAndProps(propsWithChildren);

        this.props = this._makePropsProxy(props) as P;
        this.children = children;
        this.lists = this._makePropsProxy(lists) as L;
        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _getChildrenPropsAndProps(
        propsAndChildren: P & Partial<L>,
    ): { props: P; children: Record<string, Block>; lists: L } {
        const children: Record<string, Block> = {};
        const props: Partial<P> = {};
        const lists: Partial<L> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else if (Array.isArray(value)) {
                (lists as Partial<L>)[key as keyof L] = value;
            } else {
                (props as Partial<P>)[key as keyof P] = value;
            }
        });
        return { props: props as P, children, lists: lists as L };
    }

    private _makePropsProxy<T extends Record<string, unknown>>(props: T): T {
        return new Proxy(props, {
            get: (target, prop: string) => {
                const value = target[prop as keyof T]; // безопасное чтение
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set: (target, prop: string, value) => {
                const oldTarget = { ...target };
                (target as Record<string, unknown>)[prop] = value; // каст к индексируемому типу
                this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty: () => {
                throw new Error('No access');
            },
        });
    }

    public setProps(nextProps: Partial<Record<string, unknown>>) {
        console.log('сработал сет пропс');
        if (!nextProps) return;

        Object.keys(nextProps).forEach((key) => {
            this.props[key] = nextProps[key];
        });
    }

    private _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this) as EventCallback);
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this) as EventCallback);
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this) as EventCallback);
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this) as EventCallback);
    }

    private init(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    private _render(): void {
        const propsAndStubs: Record<string, unknown> = { ...this.props };
        const tmpId = uuidv4();

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id='${child._id}'></div>`;
        });

        Object.entries(this.lists).forEach(([key]) => {
            propsAndStubs[key] = `<div data-id='__l_${tmpId}'></div>`;
        });

        const fragment = document.createElement('template');
        fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

        Object.values(this.children).forEach((child) => {
            const stub = fragment.content.querySelector(`[data-id='${child._id}']`);
            if (stub) stub.replaceWith(child.getContent());
        });

        Object.entries(this.lists).forEach(([, list]) => {
            const listCont = document.createElement('template');
            list.forEach((item) => {
                if (item instanceof Block) {
                    listCont.content.append(item.getContent());
                } else {
                    listCont.content.append(`${item}`);
                }
            });
            const stub = fragment.content.querySelector(`[data-id='__l_${tmpId}']`);
            if (stub) stub.replaceWith(listCont.content);
        });

        this._removeEvents();

        const newElement = fragment.content.firstElementChild as HTMLElement;
        if (this._element && newElement) this._element.replaceWith(newElement);
        this._element = newElement;

        this._addEvents();
        this.addAttributes();
    }

    protected render(): string {
        return '';
    }

    private _addEvents(): void {
        const { events = {} } = this.props;
        Object.entries(events).forEach(([eventName, handler]) => {
            if (this._element) this._element.addEventListener(eventName, handler);
        });
    }
    private _removeEvents(): void {
        const { events = {} as Record<string, EventListenerOrEventListenerObject> } = this.props;

        Object.keys(events).forEach((eventName) => {
            const handler = events[eventName];
            if (handler !== undefined) {
                this._element?.removeEventListener(eventName, handler);
            }
        });
    }

    public getContent(): HTMLElement {
        if (!this._element) throw new Error('Element is not создан');
        return this._element;
    }

    public show(): void {
        this.getContent().style.display = 'block';
    }

    public hide(): void {
        this.getContent().style.display = 'none';
    }

    private _componentDidMount(): void {
        this.componentDidMount();
        Object.values(this.children).forEach((child) => child.dispatchComponentDidMount());
    }

    protected componentDidMount(): void {}

    public dispatchComponentDidMount(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(oldProps: P, newProps: P): void {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) this._render();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected componentDidUpdate(_oldProps: P, _newProps: P): boolean {
        return true;
    }

    protected addAttributes(): void {
        const { attr = {} } = this.props;
        Object.entries(attr).forEach(([key, value]) => {
            if (this._element) this._element.setAttribute(key, value);
        });
    }
}
