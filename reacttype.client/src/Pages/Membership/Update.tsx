import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';

interface IMebership {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    shortname: string;
    nickName: string;
    wheelchair: boolean;
}


const MembershipUpdate = () => {
    const [membership, setmembership] = useState<IMebership>();
    const location = useLocation();
    const id: string = location.state;
   

    useEffect(() => {
        GetData();
    }, []);


    return (
        <>
            <h1>{membership?.fullName}</h1>
        </>
    );


    async function GetData() {
        const url = 'https://localhost:7002/api/Membership/Details/';
        const result = url.concat(id);
        fetch(result)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }

                setmembership(data);
            })
            .catch(errormsg => {
                console.log('There was an error!', errormsg.toString());
            });
    }
}



export default MembershipUpdate;