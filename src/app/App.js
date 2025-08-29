import Handlebars from "handlebars";
import registerPartials from "../handlebars/partials";

registerPartials();
export default class App {
  constructor() {
    this.pages = { template: "Auth" };
  }

  render() {
    const app = document.getElementById("app");

    let template = `
                {{> ${this.pages.template}}}
                {{> Navigate}}
            `

    const appTemplate = Handlebars.compile(template);
    app.innerHTML = appTemplate();

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
