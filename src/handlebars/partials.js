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
import  { Avatar }          from '../components/atoms/avatar';
import  { Span }            from '../components/atoms/span';

//molecules
import { LoginFields }      from '../components/molecules/loginFields';
import { RegFields }        from '../components/molecules/regFields';
import { UserSettingsRow}   from '../components/molecules/userSettingsRows';
import { UserChangeDataRows } from '../components/molecules/userChangeDataRows';
import { UserChangePasswordRows } from '../components/molecules/userChangePasswordRows';

//organism
import { LoginFromBlock }   from '../components/organism/loginFromBlock';
import { RegFromBlock }     from '../components/organism/regFromBlock';
import { UserSettingsFromBlock } from '../components/organism/userSettingsFromBlock';
import { UserChangeDataFromBlock } from '../components/organism/userChangeDataFromBlock';
import { UserChangePasswordFromBlock } from '../components/organism/userChangePasswordFromBlock';

//import templates
import { AuthTemplate }     from '../components/templates/authTemplate';
import { RegTemplate }      from '../components/templates/regTemplate';
import { UserSettingsTemplate } from '../components/templates/userSettingsTemplate';
import { UserChangeDataTemplate } from '../components/templates/UserChangeDataTemplate';
import { UserChangePasswordTemplate } from '../components/templates/userChangePasswordTemplate';

//import pages
import  { Auth }            from '../pages/auth';
import  { Registration }    from '../pages/registration'
import  { UserSettings }    from '../pages/userSettings';
import  { Chats }           from '../pages/chats'
import  { Page404 }         from '../pages/404';
import  { Page500 }         from '../pages/500';
import  { UserChangeData}   from '../pages/userChangeData';
import  { UserChangePassword } from '../pages/userChangePassword';

export default function registerPartials(){
    //registerPartial atoms
    Handlebars.registerPartial('Button', Button);
    Handlebars.registerPartial('Input', Input);
    Handlebars.registerPartial('Link', Link);
    Handlebars.registerPartial('H1', H1);
    Handlebars.registerPartial('H2', H2);
    Handlebars.registerPartial('Label', Label);
    Handlebars.registerPartial('Avatar', Avatar);
    Handlebars.registerPartial('Span', Span);

    //molecules
    Handlebars.registerPartial('LoginFields', LoginFields);
    Handlebars.registerPartial('RegFields', RegFields);
    Handlebars.registerPartial('Navigate', Navigate);
    Handlebars.registerPartial('UserSettingsRow', UserSettingsRow);
    Handlebars.registerPartial('UserChangeDataRows', UserChangeDataRows);
    Handlebars.registerPartial('UserChangePasswordRows', UserChangePasswordRows);

    //organism
    Handlebars.registerPartial('LoginFromBlock', LoginFromBlock);    
    Handlebars.registerPartial('RegFromBlock', RegFromBlock);
    Handlebars.registerPartial('UserSettingsFromBlock', UserSettingsFromBlock);
    Handlebars.registerPartial('UserChangeDataFromBlock', UserChangeDataFromBlock);
    Handlebars.registerPartial('UserChangePasswordFromBlock', UserChangePasswordFromBlock);
    

    
    //registerPartial templates
    Handlebars.registerPartial('AuthTemplate', AuthTemplate);
    Handlebars.registerPartial('RegTemplate', RegTemplate);
    Handlebars.registerPartial('UserSettingsTemplate', UserSettingsTemplate);
    Handlebars.registerPartial('UserChangeDataTemplate', UserChangeDataTemplate);
    Handlebars.registerPartial('UserChangePasswordTemplate', UserChangePasswordTemplate);
    
    //registerPartial pages
    Handlebars.registerPartial('Auth', Auth);
    Handlebars.registerPartial('Registration', Registration);
    Handlebars.registerPartial('UserSettings', UserSettings);
    Handlebars.registerPartial('Chats', Chats);
    Handlebars.registerPartial('Page404', Page404);
    Handlebars.registerPartial('Page500', Page500);
    Handlebars.registerPartial('UserChangeData', UserChangeData);
    Handlebars.registerPartial('UserChangePassword', UserChangePassword);
}