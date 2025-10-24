import Handlebars from 'handlebars';

describe('Handlebars шаблонизатор', () => {
    test('подставляет данные в простой шаблон', () => {
        const template = '<div class="user">{{name}}</div>';
        const data = { name: 'Алексей' };

        const compiled = Handlebars.compile(template);
        const result = compiled(data);

        expect(result).toContain('Алексей');
        expect(result).toContain('class="user"');
    });

    test('работает с условием', () => {
        const template = '{{#if isAdmin}}<div>Admin</div>{{else}}<div>User</div>{{/if}}';
        const compiled = Handlebars.compile(template);

        expect(compiled({ isAdmin: true })).toContain('Admin');
        expect(compiled({ isAdmin: false })).toContain('User');
    });

    test('работает с циклом', () => {
        const template = '<ul>{{#each items}}<li>{{this}}</li>{{/each}}</ul>';
        const compiled = Handlebars.compile(template);

        const result = compiled({ items: ['a', 'b', 'c'] });
        expect(result).toContain('<li>a</li>');
        expect(result).toContain('<li>b</li>');
        expect(result).toContain('<li>c</li>');
    });

    test('поддержка вложенных объектов', () => {
        const template = '<div>{{user.name}} - {{user.age}}</div>';
        const compiled = Handlebars.compile(template);

        const result = compiled({ user: { name: 'Алексей', age: 25 } });
        expect(result).toContain('Алексей');
        expect(result).toContain('25');
    });
});
