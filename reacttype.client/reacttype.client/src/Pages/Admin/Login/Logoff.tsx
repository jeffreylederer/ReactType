import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function Logoff() {
    const navigate = useNavigate();
    
   

    useEffect(() => {
        localStorage.clear();
        navigate("/Login");
    }, [navigate ]);
    return (
        <></>
    );
}


export default Logoff