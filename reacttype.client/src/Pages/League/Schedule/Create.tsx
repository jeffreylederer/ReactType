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
import { useCookies } from 'react-cookie';

const ScheduleCreate = () => {
    const cookies = useCookies(['id', 'name'])[0];
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
                navigate("/League/Schedules");
                console.log('Record created successfully: ', response.data);
             })
            .catch(error => {
                console.log('Error creating record: ', error);
            });
    }

    

    
  

    return (
        <>
            <h2>Create new game date for league {cookies.name}</h2>
            <form onSubmit={handleSubmit(onSubmit)} >
                <Container>
                    <input type="hidden" defaultValue={cookies.id} {...register('leagueid')} />
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
                    
                    {errors.leagueid && <p className="errorMessage">{errors.leagueid.message}</p>}
                    {errors.gameDate && <p className="errorMessage">{errors.gameDate.message}</p>}
                    {errors.cancelled && <p className="errorMessage">{errors.cancelled.message}</p>}
                    {errors.playOffs && <p className="errorMessage">{errors.playOffs.message}</p>}
                    

                </Container>
            </form>
            
        </>
    );


    

}



export default ScheduleCreate;