import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


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
        setMembership({ ...membership, [e.target.name]: e.target.value });
    }

    function OnChecked(e: React.ChangeEvent<HTMLInputElement>) {
        setMembership({ ...membership, [e.target.name]: e.target.checked });
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} >
                
                    <input {...register("id")} type="hidden" value={membership.id} onChange={OnChange} />
                    <Container fluid>
                        <Row>
                            <Col><label>First Name:</label></Col>
                    
                            <Col><input type="text" {...register('firstName', { required:"First Name is required", maxLength:50  })} value={membership.firstName}
                                    onChange={OnChange}/></Col>
                    </Row>
                    <Row>
                        <Col><label>Last Name:</label></Col>

                        <Col><input type="text" {...register('lastName', { required: "Last Name is required", maxLength: 50 })} value={membership.lastName}
                            onChange={OnChange} /></Col>
                    </Row>
                    <Row>
                        <Col><label>Short Name:</label></Col>

                        <Col><input type="text" {...register('shortname', { required: false, maxLength: 25 })} value={membership.shortname}
                            onChange={OnChange} /></Col>
                    </Row>
                    <Row>
                        <Col><label>Wheel Chair:</label></Col>

                        <Col style={{textAlign: "left"} }>
                            <input type="checkbox" {...register('wheelchair', { required: true })} checked={membership.wheelchair}
                                onChange={OnChecked} /></Col>
                    </Row>
                        <Row>
                        <Col >
                                <input type="submit" />
                            </Col>
                    </Row>

                 </Container>
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