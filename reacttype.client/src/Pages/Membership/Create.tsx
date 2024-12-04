import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { FormData, FormDataSchema } from "./FormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, Label, TextInput } from "flowbite-react";
import "./FormData.css";

const MembershipCreate = () => {
   
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(FormDataSchema),
    });

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
        <h1>Create record</h1>
            <form onSubmit={handleSubmit(onSubmit)} >


                
                <TextInput {...register("nickName")} type="hidden"   />
                <TextInput {...register("fullName")} type="hidden"   />
                <Container >
                    <Row>
                        <Col style={{ width: '15%' }}><Label>First Name:</Label></Col>

                        <Col><TextInput {...register('firstName')} style={{ width: '85%' }} />
                         </Col>
                    </Row>
                    <Row>
                        <Col style={{ width: '15%' }}><Label>Last Name:</Label></Col>

                        <Col><TextInput  {...register('lastName')} style={{ width: '85%' }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ width: '15%' }}><Label>Short Name:</Label></Col>
                        <Col><TextInput {...register('shortname')} style={{ width: '85%' }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ width: '15%' }}><Label>Wheel Chair:</Label></Col>

                        <Col style={{ textAlign: "left", width: '85%' }}>
                            <Checkbox {...register('wheelchair')}  />
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ textAlign: "center", width: '100%' }}>
                            <TextInput type="submit" />
                        </Col>
                    </Row>
                    {errors.firstName && <p className="errorMessage">{errors.firstName.message}</p>}
                    {errors.lastName && <p className="errorMessage">{errors.lastName.message}</p>}
                    {errors.shortname && <p className="errorMessage">{errors.shortname.message}</p>}
                    
                    

                </Container>
            </form>
            
        </>
    );


    

}



export default MembershipCreate;