import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { FormData } from "./FormData.tsx";

const MembershipCreate = () => {

     
       
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

    const onSubmit: SubmitHandler<FormData> = (data) => CreateData(data)

    const navigate = useNavigate();

    function CreateData(data: FormData) {
        axios.post('https://localhost:7002/api/Memberships', data)
            .then((response) => {
                console.log(response.data);
                navigate("/Membership");
                console.log('Record created successfully: ', response.data);
             })
            .catch(error => {
                console.log('Error creating record: ', error);
            });
    }

  

    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)} >

                <input {...register("id")} type="hidden"  />
                <input {...register("nickName")} type="hidden"   />
                <input {...register("fullName")} type="hidden"   />
                <Container >
                    <Row>
                        <Col><label>First Name:</label></Col>

                        <Col><input type="text" {...register('firstName', {
                            required: true,
                            maxLength: 50
                            
                        })}  title="firstName" placeholder=""
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
                        })}  title="lastName" placeholder=""
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
                                maxLength:25
                        })}  title="shortname" placeholder=""
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
                                />
                        </Col>
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