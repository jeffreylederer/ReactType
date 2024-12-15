import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { UpdateFormData, UpdateFormDataSchema } from "./UpdateFormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, Label, TextInput } from "flowbite-react";




const LeagueUpdate = () => {

    const [league, setLeague] = useState(
        {
            id: 0,
            leagueName: '',
            active: false,
            teamSize: 0,
            tiesAllowed: false,
            pointsCount: false,
            winPoints: 0,
            tiePoints: 0,
            byePoints: 0,
            startWeek: 0,
            pointsLimit: false,
            divisions: 0,
            playOffs: false
           
        }
    );
    const location = useLocation();
    const id: number = location.state;

    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm<UpdateFormData>({
        resolver: zodResolver(UpdateFormDataSchema),

    });

    const onSubmit: SubmitHandler<UpdateFormData> = (data) => updateData(data)

    const navigate = useNavigate();




    useEffect(() => {
        GetData();
        setLeague({ ...league, [id]: id });
    }, []);

    const contents = league.id === 0
        ? <p><em>Loading ...</em></p> :

        <form onSubmit={handleSubmit(onSubmit)} >

        <Container>

                <input type="hidden" {...register("id", { valueAsNumber: true })} defaultValue={league.id} />
            <Row>
                <Col style={{ width: '15%' }}><Label>League Name:</Label></Col>

                    <Col><TextInput {...register('leagueName')} style={{ width: '85%' }} defaultValue={league.leagueName} />
                </Col>
            </Row>

            <Row>
                <Col style={{ width: '25%' }}><Label>Active:</Label></Col>

                <Col style={{ textAlign: "left", width: '75%' }}>
                        <Checkbox {...register('active')} defaultChecked={league.active} />
                </Col>
            </Row>

            <Row>
                <Col style={{ width: '15%' }}><Label>Team Size:</Label></Col>

                    <Col><TextInput type="number" {...register('teamSize')} style={{ width: '85%' }} defaultValue={league.teamSize} />
                </Col>
            </Row>

            <Row>
                <Col style={{ width: '25%' }}><Label>Ties Allowed:</Label></Col>

                <Col style={{ textAlign: "left", width: '75%' }}>
                        <Checkbox {...register('tiesAllowed')} defaultChecked={league.tiesAllowed} />
                </Col>
            </Row>

            <Row>
                <Col style={{ width: '15%' }}><Label>Points Count:</Label></Col>

                <Col style={{ textAlign: "left", width: '85%' }}>
                        <Checkbox {...register('pointsCount')} defaultChecked={league.pointsCount} />
                </Col>
            </Row>

            <Row>
                <Col style={{ width: '15%' }}><Label>Points for a Win:</Label></Col>

                    <Col><TextInput {...register('winPoints')} style={{ width: '85%' }} defaultValue={league.winPoints} />
                </Col>
            </Row>

            <Row>
                <Col style={{ width: '15%' }}><Label>Points for a Tie:</Label></Col>

                    <Col><TextInput {...register('tiePoints')} style={{ width: '85%' }} defaultValue={league.tiePoints} />
                </Col>
            </Row>

            <Row>
                <Col style={{ width: '15%' }}><Label>Points for a Bye:</Label></Col>

                    <Col><TextInput {...register('byePoints')} style={{ width: '85%' }} defaultValue={league.byePoints} />
                </Col>
            </Row>

            <Row>
                <Col style={{ width: '15%' }}><Label>Start Week:</Label></Col>

                    <Col><TextInput {...register('startWeek')} style={{ width: '85%' }} defaultValue={league.startWeek} />
                </Col>
            </Row>

            <Row>
                <Col style={{ width: '25%' }}><Label>Points are limited:</Label></Col>

                <Col style={{ textAlign: "left", width: '75%' }}>
                        <Checkbox {...register('pointsLimit')} defaultChecked={league.pointsLimit} />
                </Col>
            </Row>

            <Row>
                <Col style={{ width: '15%' }}><Label># of Divisions:</Label></Col>

                    <Col><TextInput {...register('divisions')} style={{ width: '85%' }} defaultValue={league.divisions} />
                </Col>
            </Row>

            <Row>
                <Col style={{ width: '25%' }}><Label>Playoffs:</Label></Col>

                <Col style={{ textAlign: "left", width: '75%' }}>
                        <Checkbox {...register('playOffs')} defaultChecked={league.playOffs} />
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

    return (
        <>
            <h1>Update record</h1>
            {contents}


        </>
    );


    async function GetData() {
        const url: string = 'https://localhost:7002/api/Leagues/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        axios.get(fullUrl)
            .then(response => {

                setLeague(response.data);


                console.log('Record aquired successfully: ', response.data);
            })
            .catch(error => {
                console.error('Error aquiring record: ', error);
            });

    }

    function updateData(data: UpdateFormData) {
        const url: string = 'https://localhost:7002/api/Leagues/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        data.id = id;
        axios.put(fullUrl, data)
            .then(response => {
                console.log('Record updated successfully: ', response.data);
                navigate("/Admin/Leagues");
            })
            .catch(error => {
                console.error('Error updating record: ', error);
            });


    }
}



export default LeagueUpdate;