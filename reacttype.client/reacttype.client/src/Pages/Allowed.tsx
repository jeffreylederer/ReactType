import { useCookies } from 'react-cookie';
import { UserTypeDetail } from './Admin/Login/UserTypeDetail';

export function Allowed()  {
    const cookie = useCookies(['login'])[0];
    const user: UserTypeDetail = cookie.login;
    const permission: string = user.role;

    return (permission == "SiteAdmin" || permission == "Admin") ? "hide" : "show";
}