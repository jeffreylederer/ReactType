import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { FormData, FormDataSchema } from "./FormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, Label, TextInput, Select } from "flowbite-react";
import "./FormData.css";

const UserCreate = () => {

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
        axios.post('https://localhost:7002/api/Users', data)
            .then((response) => {
                console.log(response.data);
                navigate("/Users");
                console.log('Record created successfully: ', response.data);
            })
            .catch(error => {
                console.log('Error creating record: ', error);
            });
    }






    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)} >
               
                <Container >
                    <Row>
                        <Col style={{ width: '15%' }}><Label>User Name:</Label></Col>

                        <Col><TextInput {...register('username')} style={{ width: '85%' }}  />
                        </Col>
                    </Row>

                    <Row>
                        <Col style={{ width: '15%' }}><Label>Password:</Label></Col>

                        <Col><TextInput type="password" {...register('password')} style={{ width: '85%' }}  />
                        </Col>
                    </Row>

                    <Row>
                        <Col style={{ width: '25%' }}><Label>Active:</Label></Col>

                        <Col style={{ textAlign: "left", width: '75%' }}>
                            <Checkbox {...register('isActive')} />
                        </Col>
                    </Row>

                    <Row>
                        <Col style={{ width: '15%' }}><Label>Display Name:</Label></Col>

                        <Col><TextInput type="number" {...register('displayName')} style={{ width: '85%' }} />
                        </Col>
                    </Row>

                    <Row>
                        <Col style={{ width: '15%' }}><Label>Display Name:</Label></Col>

                        <Col>
                            <Select id="countries" style={{ width: '15%' }}  {...register('roleId')}>
                                <option value="1">Observer</option>
                                <option value="2">Scorer</option>
                                <option value="3">Admin</option>
                                <option value="4">SiteAdmin</option>
                            </Select>
                        </Col>
                    </Row>

                    <Row>
                        <Col style={{ textAlign: "center", width: '100%' }}>
                            <TextInput type="submit" />
                        </Col>
                    </Row>
                   


                    {errors.username && <p className="errorMessage">{errors.username.message}</p>}
                    {errors.displayName && <p className="errorMessage">{errors.displayName.message}</p>}
                    {errors.password && <p className="errorMessage">{errors.password.message}</p>}
                    



                </Container>
            </form>

        </>
    );




}



export default UserCreate;