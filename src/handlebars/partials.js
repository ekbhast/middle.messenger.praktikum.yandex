import  Handlebars          from 'handlebars';

// import components

//atoms
import  { Button }          from '../components/atoms/button'
import  { Input }           from '../components/atoms/input';
import  { Link }            from '../components/atoms/link';
import  { H1 }              from '../components/atoms/headers/h1';
import  { H2 }              from '../components/atoms/headers/h2';
import  { Navigate }        from '../components/organism/navigate';
import  { Label }           from '../components/atoms/label';
import  { Avatar }          from '../components/atoms/avatar/index';

//molecules
import { LoginFields }      from '../components/molecules/loginFields';
import { RegFields }        from '../components/molecules/regFields';

//organism
import { LoginFromBlock }   from '../components/organism/loginFromBlock';
import { RegFromBlock } from '../components/organism/regFromBlock';
import { UserSettingsFromBlock } from '../components/organism/userSettingsFromBlock';

//import templates
import { AuthTemplate }     from '../components/templates/authTemplate';
import { RegTemplate }      from '../components/templates/regTemplate';
import { UserSettingsTemplate } from '../components/templates/userSettingsTemplate';

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
    Handlebars.registerPartial('H2', H2);
    Handlebars.registerPartial('Label', Label);
    Handlebars.registerPartial('Avatar', Avatar);

    //molecules
    Handlebars.registerPartial('LoginFields', LoginFields);
    Handlebars.registerPartial('RegFields', RegFields);
    Handlebars.registerPartial('Navigate', Navigate);

    //organism
    Handlebars.registerPartial('LoginFromBlock', LoginFromBlock);    
    Handlebars.registerPartial('RegFromBlock', RegFromBlock);
    Handlebars.registerPartial('UserSettingsFromBlock',UserSettingsFromBlock);

    
    //registerPartial templates
    Handlebars.registerPartial('AuthTemplate', AuthTemplate);
    Handlebars.registerPartial('RegTemplate', RegTemplate);
    Handlebars.registerPartial('UserSettingsTemplate', UserSettingsTemplate);
    
    //registerPartial pages
    Handlebars.registerPartial('Auth', Auth);
    Handlebars.registerPartial('Registration', Registration);
    Handlebars.registerPartial('UserSettings', UserSettings);
    Handlebars.registerPartial('Chats', Chats);
    Handlebars.registerPartial('Page404', Page404);
    Handlebars.registerPartial('Page500', Page500);
}