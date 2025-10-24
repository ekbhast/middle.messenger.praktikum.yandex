import { Route } from './Route';
import { BlockConstructor } from '../types/types';

export default class Router {
    private static __instance: Router;
    private routes: Route[] = [];
    private history: History = window.history;
    private _currentRoute: Route | null = null;
    private _rootQuery!: HTMLElement;

    constructor(rootQuery: HTMLElement) {
        if (Router.__instance) return Router.__instance;

        if (!rootQuery) throw new Error('Контейнер rootQuery не найден');
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: BlockConstructor, className?: string) {
        const route = new Route(
            pathname.replace(/\/$/, ''), // убираем слеш в конце
            block,
            { rootQuery: this._rootQuery, class: className || '' },
        );
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = () => {
            this._onRoute(window.location.pathname);
        };

        // Обрабатываем первый заход на страницу
        let initialPath = window.location.pathname;

        // Если пользователь зашел напрямую на /index.html, заменяем на /
        if (initialPath === '/index.html') {
            initialPath = '/';
            this.history.replaceState({}, '', initialPath);
        }

        this._onRoute(initialPath);
    }

    private _onRoute(pathname: string) {
        // убираем слеш в конце для маршрутов
        const cleanPath = pathname.replace(/\/$/, '');
        const route = this.getRoute(cleanPath);
        if (!route) return;

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
            this._rootQuery.innerHTML = '';
        }

        this._currentRoute = route;
        this._currentRoute.render();
    }

    go(pathname: string) {
        const cleanPath = pathname.replace(/\/$/, '');
        this.history.pushState({}, '', cleanPath);
        this._onRoute(cleanPath);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string): Route | null {
        const cleanPath = pathname.replace(/\/$/, '');
        return this.routes.find((route) => route.match(cleanPath)) || null;
    }
}
