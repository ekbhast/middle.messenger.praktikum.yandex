import { Route } from './Route';

export default class Router {
    private static __instance: Router;
    private routes: Route[];
    private history: History;
    private _currentRoute: Route | null;
    private _rootQuery: HTMLElement;

    constructor(rootQuery: HTMLElement) {
        if (Router.__instance) return Router.__instance;

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery; // контейнер для рендеринга

        Router.__instance = this;
    }

    use(pathname: string, block: any) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = (event) => {
            const path = event.currentTarget?.location.pathname;
            if (path) this._onRoute(path);
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
        route.render(); // Route использует переданный rootQuery
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

    getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname)) || null;
    }
}
