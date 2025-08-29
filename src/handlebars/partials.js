import  Handlebars          from 'handlebars';

// import components

//atoms
import  { Button }          from '../components/atoms/button'
import  { Input }           from '../components/atoms/input';
import  { Link }            from '../components/atoms/link';
import  { H1 }              from '../components/atoms/headers/h1'
import  { Navigate }        from '../components/organism/navigate';
import  { Label }           from '../components/atoms/label'

//molecules
import { LoginActions }     from '../components/molecules/loginActions';
import { LoginFields }      from '../components/molecules/loginFields';
import { LoginFromBlock }   from '../components/organism/loginFromBlock';

//import templates
import { AuthTemplate }     from '../components/templates/authTemplate/indes';


//import pages
import  { Auth }            from '../pages/auth';
import  { Registration }    from '../pages/registration'
import  { UserSettings }    from '../pages/userSettings';
import  { Chats }           from '../pages/chats'
import  { Page404 }         from '../pages/404';
import  { Page500 }         from '../pages/500';

export default function registerPartials(){
    //registerPartial atoms
    Handlebars.registerPartial('Button', Button);
    Handlebars.registerPartial('Input', Input);
    Handlebars.registerPartial('Link', Link);
    Handlebars.registerPartial('H1', H1);
    Handlebars.registerPartial('Label', Label);

    //molecules
    Handlebars.registerPartial('LoginActions', LoginActions);
    Handlebars.registerPartial('LoginFields', LoginFields);
    Handlebars.registerPartial('LoginFromBlock', LoginFromBlock);
    
    Handlebars.registerPartial('Navigate', Navigate);
    
    //registerPartial templates
    Handlebars.registerPartial('AuthTemplate', AuthTemplate);
    
    //registerPartial pages
    Handlebars.registerPartial('Auth', Auth);
    Handlebars.registerPartial('Registration', Registration);
    Handlebars.registerPartial('UserSettings', UserSettings);
    Handlebars.registerPartial('Chats', Chats);
    Handlebars.registerPartial('Page404', Page404);
    Handlebars.registerPartial('Page500', Page500);
}