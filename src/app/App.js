import  Handlebars  from 'handlebars';

// import components
import  { Button } from '../components/atoms/button'
import  { Navigate } from '../components/organism/navigate';

//import templates

//import pages
import  { Auth }            from '../pages/auth';
import  { Registration }    from '../pages/registration'
import  { UserSettings }    from '../pages/userSettings';
import  { Chats }           from '../pages/chats'
import  { Page404 }         from '../pages/404';
import  { Page500 }         from '../pages/500';

//registerPartial components
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Navigate', Navigate);

//registerPartial templates

//registerPartial pages
Handlebars.registerPartial('Auth', Auth);
Handlebars.registerPartial('Registration', Registration);
Handlebars.registerPartial('UserSettings', UserSettings);
Handlebars.registerPartial('Chats', Chats);
Handlebars.registerPartial('Page404', Page404);
Handlebars.registerPartial('Page500', Page500);


export default class App{
    constructor(){
        this.pages = {template:'Auth'};
    }
    
    render(){
        const app = document.getElementById('app');
        console.log(this.pages.template)

        let template = 
            `<div>
                {{> ${this.pages.template}}}
                {{> Navigate}}
            </div>`;
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
