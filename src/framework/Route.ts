export class Route {
    private _pathname: string;
    private _blockClass: any;
    private _block: any;
    private _rootQuery: HTMLElement;

    constructor(pathname: string, view: any, props: { rootQuery: HTMLElement; class: string }) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._rootQuery = props.rootQuery;
        this._props = props; // сохраняем остальные пропсы для передачи в блок
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
        if (!this._block) {
            this._block = new this._blockClass(this._props); // создаём блок страницы
            this._rootQuery.innerHTML = ''; // очищаем контейнер
            this._rootQuery.appendChild(this._block.getContent()); // вставляем контент
            return;
        }

        this._block.show(); // если блок уже создан, просто показываем
    }
}
