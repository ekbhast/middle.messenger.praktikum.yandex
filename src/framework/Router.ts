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
        const route = new Route(pathname, block, { rootQuery: this._rootQuery, class: className || '' });
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = () => {
            this._onRoute(window.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) return;

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        this._currentRoute.render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string): Route | null {
        return this.routes.find((route) => route.match(pathname)) || null;
    }
}
export const router = new Router(document.getElementById('app')!);

