import Block from './Block';

// Мок блока-потомка
class MockChildBlock extends Block {
    render(): string {
        return `<span>Child</span>`;
    }
}

// Блок-родитель
class ParentBlock extends Block<{ title: string; child?: Block }> {
    render(): string {
        return `
      <div class="parent">
        <h1>{{title}}</h1>
        {{{child}}}
      </div>
    `;
    }
}

class ChildBlock extends Block {
    protected render(): string {
        return `<span>Child</span>`;
    }
}

class ListBlock extends Block<{ lists: Array<Block | string> }> {
    protected render(): string {
        return `<div><div data-id="items">{{{lists}}}</div></div>`;
    }
}

describe('Block', () => {
    test('рендерит обычный контент', () => {
        class SimpleBlock extends Block<{ title: string }> {
            render(): string {
                return `<div>{{title}}</div>`;
            }
        }

        const block = new SimpleBlock({ title: 'Hello' });
        block['_render']();
        const el = block.getContent();
        expect(el.textContent).toBe('Hello');
    });
    test('рендерит children', () => {
        const child = new MockChildBlock();
        const parent = new ParentBlock({ title: 'Parent', child });

        parent['_render']();

        const el = parent.getContent();

        expect(el.querySelector('h1')!.textContent).toBe('Parent');
        expect(el.querySelector('span')!.textContent).toBe('Child');
    });
    test('рендерит список с Block и строками', () => {
        const child = new ChildBlock();
        const list = [child, 'one', 'two'];

        const block = new ListBlock({ lists: list });
        block['_render']();

        const el = block.getContent();
        const container = el.querySelector('[data-id="items"]')!;

        const spans = container.querySelectorAll('span');
        expect(Array.from(spans).some((s) => s.textContent === 'Child')).toBe(true);

        expect(container.textContent).toContain('one');
        expect(container.textContent).toContain('two');
    });
});
