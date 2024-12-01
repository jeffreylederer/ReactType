import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { FormData } from "./FormData.tsx";





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

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

    const onSubmit: SubmitHandler<FormData> = (data) =>updateData(data)

    const navigate = useNavigate();
    
    
    

    useEffect(() => {
        GetData();
        setMembership({ ...membership, [id]: id});
     }, []);

    
    return (
        <>
            <p>ID: {membership.id}</p>
            <form onSubmit={handleSubmit(onSubmit)} >

                
                <Container >
                    <input {...register("id")} type="hidden" defaultValue={membership.id} />
                    <input {...register("nickName")} type="hidden" defaultValue={membership.nickName}  />
                    <input {...register("fullName")} type="hidden" defaultValue={membership.fullName}  />
                    <Row>
                        <Col><label>First Name:</label></Col>

                        <Col><input type="text" {...register('firstName', {
                            required: true,
                            maxLength: 50

                        })} defaultValue={membership.firstName} title="firstName" placeholder=""
                            style={{ width: '350px' }} />
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
                        })} defaultValue={membership.lastName} title="lastName" placeholder=""
                            style={{ width: '350px' }}
                            />
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
                        })} defaultValue={membership.shortname} title="shortname" placeholder=""
                            style={{ width: '350px' }}
                            />

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
                                 /></Col>
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

    function updateData(data:FormData) {
        const url: string = 'https://localhost:7002/api/Memberships/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        data.id = id;
        data.fullName = membership.firstName;
        data.nickName = membership.nickName;
          axios.put(fullUrl, data)
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