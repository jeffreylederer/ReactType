import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function Logoff() {
    const navigate = useNavigate();
    const removeCookie = useCookies(['login', 'userName'])[2];
   

    useEffect(() => {
        removeCookie('login');
        navigate("/Login");
    }, [removeCookie, navigate ]);
    return (
        <></>
    );
}


export default Logoff