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

const LeagueCreate = () => {

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
        axios.post('https://localhost:7002/api/Leagues', data)
            .then((response) => {
                console.log(response.data);
                navigate("/Admin/Leagues");
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
                        <Col style={{ width: '15%' }}><Label>League Name:</Label></Col>

                        <Col><TextInput {...register('leagueName')} style={{ width: '85%' }} />
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col style={{ width: '25%' }}><Label>Active:</Label></Col>

                        <Col style={{ textAlign: "left", width: '75%' }}>
                            <Checkbox {...register('active')} />
                        </Col>
                    </Row>

                    <Row>
                        <Col style={{ width: '15%' }}><Label>Team Size:</Label></Col>

                        <Col><TextInput type="number" {...register('teamSize')} style={{ width: '85%' }} />
                        </Col>
                    </Row>

                    <Row>
                        <Col style={{ width: '25%' }}><Label>Ties Allowed:</Label></Col>

                        <Col style={{ textAlign: "left", width: '75%' }}>
                            <Checkbox {...register('tiesAllowed')} />
                        </Col>
                    </Row>

                    <Row>
                        <Col style={{ width: '15%' }}><Label>Points Count:</Label></Col>

                        <Col style={{ textAlign: "left", width: '85%' }}>
                            <Checkbox {...register('pointsCount')} />
                        </Col>
                    </Row>

                    <Row>
                        <Col style={{ width: '15%' }}><Label>Points for a Win:</Label></Col>

                        <Col><TextInput {...register('winPoints')} style={{ width: '85%' }} />
                        </Col>
                    </Row>

                    <Row>
                        <Col style={{ width: '15%' }}><Label>Points for a Tie:</Label></Col>

                        <Col><TextInput {...register('tiePoints')} style={{ width: '85%' }} />
                        </Col>
                    </Row>

                    <Row>
                        <Col style={{ width: '15%' }}><Label>Points for a Bye:</Label></Col>

                        <Col><TextInput {...register('byePoints')} style={{ width: '85%' }} />
                        </Col>
                    </Row>

                    <Row>
                        <Col style={{ width: '15%' }}><Label>Start Week:</Label></Col>

                        <Col><TextInput {...register('startWeek')} style={{ width: '85%' }} />
                        </Col>
                    </Row>

                    <Row>
                        <Col style={{ width: '25%' }}><Label>Points are limited:</Label></Col>

                        <Col style={{ textAlign: "left", width: '75%' }}>
                            <Checkbox {...register('pointsLimit')} />
                        </Col>
                    </Row>

                    <Row>
                        <Col style={{ width: '15%' }}><Label># of Divisions:</Label></Col>

                        <Col><TextInput {...register('divisions')} style={{ width: '85%' }} />
                        </Col>
                    </Row>

                    <Row>
                        <Col style={{ width: '25%' }}><Label>Playoffs:</Label></Col>

                        <Col style={{ textAlign: "left", width: '75%' }}>
                            <Checkbox {...register('playOffs')} />
                        </Col>
                    </Row>

                    <Row>
                        <Col style={{ textAlign: "center", width: '100%' }}>
                            <TextInput type="submit" />
                        </Col>
                    </Row>
                   


                    {errors.leagueName && <p className="errorMessage">{errors.leagueName.message}</p>}
                    {errors.teamSize && <p className="errorMessage">{errors.teamSize.message}</p>}
                    {errors.winPoints && <p className="errorMessage">{errors.winPoints.message}</p>}
                    {errors.tiePoints && <p className="errorMessage">{errors.tiePoints.message}</p>}
                    {errors.byePoints && <p className="errorMessage">{errors.byePoints.message}</p>}
                    {errors.startWeek && <p className="errorMessage">{errors.startWeek.message}</p>}
                    {errors.divisions && <p className="errorMessage">{errors.divisions.message}</p>}



                </Container>
            </form>

        </>
    );




}



export default LeagueCreate;