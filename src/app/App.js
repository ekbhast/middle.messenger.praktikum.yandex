import Handlebars from 'handlebars';
// import * as Pages from '../pages';

import Button from '../components/atoms/button';
import  { Auth }  from '../pages/auth';
import { Registration } from '../pages/registration'

Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Auth', Auth);
Handlebars.registerPartial('Registration', Registration);

export default class App{

    render(){
        const app = document.getElementById('app');
        let pages = 'Auth';

        let template = `<div>
            {{> ${pages}}}
        </div>`
        const appTemplate = Handlebars.compile(template);
        app.innerHTML = appTemplate();
    }
    
}
