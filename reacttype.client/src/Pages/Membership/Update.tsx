import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";



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
    const id: number = location.state;

    const { register, handleSubmit, formState: { errors } } = useForm<IMembership>()

    const onSubmit: SubmitHandler<IMembership> = (data) =>updateData(data)

    const navigate = useNavigate();
    
    
    

    useEffect(() => {
        GetData();
        setMembership({ ...membership, [id]: id});
     }, []);

    function OnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setMembership({ ...membership, [e.target.name]: e.target.value });
    }

    function OnChecked(e: React.ChangeEvent<HTMLInputElement>) {
        setMembership({ ...membership, [e.target.name]: e.target.checked });
    }

    return (
        <>
            <p>ID: {membership.id}</p>
            <form onSubmit={handleSubmit(onSubmit)} >

                
                <Container >
                    <input {...register("id")} type="hidden" value={membership.id} />
                    <input {...register("nickName")} type="hidden" value={membership.nickName} />
                    <input {...register("fullName")} type="hidden" value={membership.fullName}  />
                    <Row>
                        <Col><label>First Name:</label></Col>

                        <Col><input type="text" {...register('firstName', {
                            required: true,
                            maxLength: 50

                        })} value={membership.firstName} title="firstName" placeholder=""
                            onChange={OnChange} style={{ width: '350px' }} />
                            {errors.firstName && errors.firstName.type === "required" && (
                                <p>This is required</p>
                            )}
                            {errors.firstName && errors.firstName.type === "maxLength" && (
                                <p>Max length exceeded</p>
                            )}
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col><label>Last Name:</label></Col>

                        <Col><input type="text" {...register('lastName', {
                            required: true,
                            maxLength: 50
                        })} value={membership.lastName} title="lastName" placeholder=""
                            style={{ width: '350px' }}
                            onChange={OnChange} />
                            {errors.lastName && errors.lastName.type === "required" && (
                                <p>This is required</p>
                            )}
                            {errors.lastName && errors.lastName.type === "maxLength" && (
                                <p>Max length exceeded</p>
                            )}
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col><label>Short Name:</label></Col>

                        <Col><input type="text" {...register('shortname', {
                            maxLength: 25
                        })} value={membership.shortname} title="shortname" placeholder=""
                            style={{ width: '350px' }}
                            onChange={OnChange} />

                            {errors.lastName && errors.lastName.type === "maxLength" && (
                                <p>Max length exceeded</p>
                            )}
                            

                        </Col>
                    </Row>
                    <Row>
                        <Col><label>Wheel Chair:</label></Col>

                        <Col style={{ textAlign: "left" }}>
                            <input type="checkbox" {...register('wheelchair')}
                                title="wheelchair" placeholder=""
                                checked={membership.wheelchair}
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
        const url: string = 'https://localhost:7002/api/Memberships/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        axios.get(fullUrl)
            .then(response => {
                
                setMembership(response.data);
               
                console.log('Record aquired successfully: ', response.data);
            })
            .catch(error => {
                console.error('Error aquiring record: ', error);
            });

    }

    function updateData(data: IMembership) {
        const url: string = 'https://localhost:7002/api/Memberships/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);

          axios.put(fullUrl, membership)
            .then(response => {
                console.log('Record updated successfully: ', response.data);
                navigate("/Membership");
            })
            .catch(error => {
                console.error('Error updating record: ', error);
            });


    }
}



export default MembershipUpdate;