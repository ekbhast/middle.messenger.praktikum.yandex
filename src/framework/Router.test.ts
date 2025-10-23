import Router from './Router';
import Block from './Block';

class MockBlock extends Block {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(props: any = {}) {
        super(props);
    }

    getContent() {
        return document.createElement('div');
    }

    hide() {}
}

describe('Router', () => {
    let router: Router;
    let root: HTMLElement;

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (Router as any).__instance = null;

        document.body.innerHTML = '<div id="app"></div>';
        root = document.getElementById('app')!;

        // Создаём Router
        router = new Router(root);

        router
            .use('/', MockBlock)
            .use('/messenger', MockBlock)
            .use('/page500', MockBlock)
            .use('/page404', MockBlock)
            .use('/user-change-date', MockBlock)
            .use('/user-change-password', MockBlock)
            .use('/settings', MockBlock)
            .use('/sign-up', MockBlock);
    });

    test('go() вызывает render() у правильного маршрута', () => {
        const homeRoute = router.getRoute('/')!;
        const messengerRoute = router.getRoute('/messenger')!;

        const spyHome = jest.spyOn(homeRoute, 'render');
        const spyMessenger = jest.spyOn(messengerRoute, 'render');

        router.go('/');
        expect(spyHome).toHaveBeenCalled();

        router.go('/messenger');
        expect(spyMessenger).toHaveBeenCalled();
    });

    test('смена маршрута вызывает leave() у предыдущего', () => {
        const homeRoute = router.getRoute('/')!;
        const spyLeave = jest.spyOn(homeRoute, 'leave');

        router.go('/');
        router.go('/messenger');

        expect(spyLeave).toHaveBeenCalled();
    });

    test('getRoute() возвращает правильный маршрут', () => {
        const homeRoute = router.getRoute('/')!;
        const messengerRoute = router.getRoute('/messenger')!;

        expect(router.getRoute('/')).toBe(homeRoute);
        expect(router.getRoute('/messenger')).toBe(messengerRoute);
        expect(router.getRoute('/unknown')).toBeNull();
    });

    test('back() и forward() вызывают методы history', () => {
        const backSpy = jest.spyOn(window.history, 'back');
        const forwardSpy = jest.spyOn(window.history, 'forward');

        router.back();
        router.forward();

        expect(backSpy).toHaveBeenCalled();
        expect(forwardSpy).toHaveBeenCalled();
    });
});
