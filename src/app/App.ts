import Handlebars from "handlebars";
import registerPartials from "../handlebars/partials";

registerPartials();
export default class App {
    private pages: { template: string };
  constructor() {
    this.pages = { template: "UserChangeData" };
  }

  render() {
    const app: HTMLElement | null = document.getElementById("app");

    let template = `
                {{> ${this.pages.template}}}
                {{> Navigate}}
            `

    const appTemplate = Handlebars.compile(template);
    if (app){
      app.innerHTML = appTemplate({});
    }
    
    let buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      if (button.dataset.page === "Navigate") {
        button.addEventListener("click", () => {
          this.pages.template = `${button.id}`;
          this.render();
        });
      }
    });
  }
}
