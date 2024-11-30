import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";

const MembershipCreate = () => {

    interface IMembership {
        id: number;
        firstName: string;
        lastName: string;
        fullName: string;
        shortname: string;
        nickName: string;
        wheelchair: boolean;
    };



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
    

    const { register, handleSubmit, formState: { errors } } = useForm<IMembership>()

    const onSubmit: SubmitHandler<IMembership> = (data) => CreateData(data)

    const navigate = useNavigate();

    function CreateData(data: IMembership) {
        axios.post('https://localhost:7002/api/Memberships/Create', data)
            .then((response) => {
                console.log(response.data);
                navigate("/Membership");
                console.log('Record created successfully: ', response.data);
             })
            .catch(error => {
                console.log('Error creating record: ', error);
            });
    }


    

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
                <input {...register("nickName")} type="hidden" value={membership.nickName} onChange={OnChange} />
                <input {...register("fullName")} type="hidden" value={membership.fullName} onChange={OnChange} />
                <Container >
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
                            {!errors.firstName && (
                                <p> </p>
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
                            {!errors.lastName && (
                                <p> </p>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col><label>Short Name:</label></Col>

                        <Col><input type="text" {...register('shortname', {
                                maxLength:25
                        })} value={membership.shortname} title="shortname" placeholder=""
                            style={{ width: '350px' }}
                            onChange={OnChange} />
                            
                            {errors.lastName && errors.lastName.type === "maxLength" && (
                                <p>Max length exceeded</p>
                            )}
                            {!errors.shortname && (
                                <p> </p>
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


    

}



export default MembershipCreate;