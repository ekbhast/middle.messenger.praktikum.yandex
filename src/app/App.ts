import Handlebars from 'handlebars';
import registerPartials from '../handlebars/partials';

registerPartials();
export default class App {
  private pages: { template: string };

  constructor() {
    this.pages = { template: 'Chats' };
  }

  render() {
    const app: HTMLElement | null = document.getElementById('app');

    const template = `
                {{> ${this.pages.template}}}
                {{> Navigate}}
            `;

    const appTemplate = Handlebars.compile(template);
    if (app) {
      app.innerHTML = appTemplate({});
    }

    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      if (button.dataset.page === 'Navigate') {
        button.addEventListener('click', () => {
          this.pages.template = `${button.id}`;
          this.render();
        });
      }
    });
  }
}
