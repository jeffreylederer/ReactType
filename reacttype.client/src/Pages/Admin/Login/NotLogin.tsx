import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function NotLogin() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/Login");
    }, []);
    return (
        <></>
    );

}

export default NotLogin;