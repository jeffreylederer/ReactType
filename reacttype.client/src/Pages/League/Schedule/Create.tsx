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
import { Form } from "react-bootstrap";

const ScheduleCreate = () => {
   
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
        axios.post('https://localhost:7002/api/Schedules', data)
            .then((response) => {
                console.log(response.data);
                navigate("/Schedule");
                console.log('Record created successfully: ', response.data);
             })
            .catch(error => {
                console.log('Error creating record: ', error);
            });
    }

    

    
  

    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)} >
                <Container>

                    <Row>
                        <Col style={{ width: '15%' }}><Label>Playoffs:</Label></Col>

                        <Col style={{ textAlign: "left", width: '85%' }}>
                            <Form.Control type="date" {...register('gameDate')} />
                        </Col>
                    </Row>

                    <Row>
                        <Col style={{ width: '15%' }}><Label>Playoffs:</Label></Col>

                        <Col style={{ textAlign: "left", width: '85%' }}>
                            <Checkbox {...register('playOffs')} />
                        </Col>
                    </Row>
                
                    <Row>
                        <Col style={{ width: '15%' }}><Label>Cancelled:</Label></Col>

                        <Col style={{ textAlign: "left", width: '85%' }}>
                            <Checkbox {...register('cancelled')}  />
                        </Col>
                    </Row>

                    <Row>
                        <Col style={{ textAlign: "center", width: '100%' }}>
                            <TextInput type="submit" />
                        </Col>
                    </Row>
                    {errors.gameDate && <p className="errorMessage">{errors.gameDate.message}</p>}
                   
                    
                    

                </Container>
            </form>
            
        </>
    );


    

}



export default ScheduleCreate;