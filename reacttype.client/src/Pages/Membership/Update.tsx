import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface IMembership {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    shortname: string;
    nickName: string;
    wheelchair: boolean;                
};


const MembershipUpdate = () => {
    const [membership, setMembership] = useState(
        {
            id: 0,
            firstName: '',
            lastName: '',
            fullName: '',
            shortname: '',
            nickName: '',
            wheelchair: false
        }
    );
    const location = useLocation();
    const id: string = location.state;

    const { register, handleSubmit } = useForm<IMembership>()

    const onSubmit: SubmitHandler<IMembership> = (data) => console.log(data)
    
   
    

    useEffect(() => {
        GetData();
        
     }, []);

    function OnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setMembership(membership => ({ ...membership, [e.currentTarget.name]: e.currentTarget.value }));
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="form-group">
                    <input {...register("id")} type="hidden" value={membership.id} onChange={OnChange} />
                
                <input type="text" {...register('firstName', { required: true })} value={membership.firstName}
                        onChange={OnChange}/>
                <br/>
                    <input type="submit" />
                </div>
            </form>
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

                setMembership(data);
                
            })
            .catch(errormsg => {
                console.log('There was an error!', errormsg.toString());
            });
    }
}



export default MembershipUpdate;