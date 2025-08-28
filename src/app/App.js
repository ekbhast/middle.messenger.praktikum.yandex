import Handlebars from 'handlebars';
// import * as Pages from '../pages';

import Button from '../components/atoms/button';
import  { Auth }  from '../pages/auth';
import { Registration } from '../pages/registration'
import { Navigate } from '../components/organism/navigate';

Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Auth', Auth);
Handlebars.registerPartial('Registration', Registration);
Handlebars.registerPartial('Navigate', Navigate);

export default class App{
    constructor(){
        this.pages = {template:'Navigate'};
    }
    
    render(){
        const app = document.getElementById('app');
        console.log(this.pages.template)

        let template = `<div>
            {{> Auth}}
            {{> ${this.pages.template}}}
        </div>`
        const appTemplate = Handlebars.compile(template);
        app.innerHTML = appTemplate();

        let buttons = document.querySelectorAll('button');
        console.log(buttons);
        buttons.forEach((button)=>{
            button.addEventListener('click', ()=>{
                this.pages.template = `${button.id}`
                console.log(button.id);
                this.render();
            })
        })
    }
    
}
