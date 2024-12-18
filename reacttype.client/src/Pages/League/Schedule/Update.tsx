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
import { Form } from "react-bootstrap";
import { ConvertLeague, leagueType } from "../../leagueObject.tsx";


const ScheduleUpdate = () => {

    const league: leagueType = ConvertLeague();
    const [schedule, setSchedule] = useState(
        {
            id: 0,
            gameDate: new Date().toISOString().slice(0, 10),
            playOffs: false,
            cancelled: false,
            leagueid: 0


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

    const onSubmit: SubmitHandler<UpdateFormData> = (data) =>updateData(data)

    const navigate = useNavigate();
    
    
    

    useEffect(() => {
        GetData();
        
    }, []);

    const contents = schedule.id === 0
        ? <p><em>Loading ...</em></p> :

        <form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))} >



            <input type="hidden" {...register("id", { valueAsNumber: true })} defaultValue={schedule.id} />
            <input type="hidden" {...register("leagueid", { valueAsNumber: true })} defaultValue={schedule.leagueid} />
           
            <Container >
                <Row>
                    <Col style={{ width: '15%' }}><Label>Game Date:</Label></Col>

                    <Col style={{ textAlign: "left", width: '85%' }}>
                        <Form.Control type="date" {...register('gameDate')} defaultValue={schedule.gameDate} />
                    </Col>
                </Row>

                <Row>
                    <Col style={{ width: '15%' }}><Label>Playoffs:</Label></Col>

                    <Col style={{ textAlign: "left", width: '85%' }}>
                        <Checkbox {...register('playOffs')} defaultChecked={schedule.playOffs } />
                    </Col>
                </Row>

                <Row>
                    <Col style={{ width: '15%' }}><Label>Cancelled:</Label></Col>

                    <Col style={{ textAlign: "left", width: '85%' }}>
                        <Checkbox {...register('cancelled')} defaultChecked={schedule.cancelled} />
                    </Col>
                </Row>
                <Row>
                    <Col style={{ textAlign: "center", width: '100%' }}>
                        <TextInput type="submit" />
                    </Col>
                </Row>
                {errors.id && <p className="errorMessage">{errors.id.message}</p>}
                {errors.gameDate && <p className="errorMessage">{errors.gameDate.message}</p>}
                {errors.cancelled && <p className="errorMessage">{errors.cancelled.message}</p>}
                {errors.playOffs && <p className="errorMessage">{errors.playOffs.message}</p>}
                



            </Container>
        </form>
    
    return (
        <>
            <h3>Update schedule for league {league.leagueName}</h3>
            {contents}

            
        </>
    );


    async function GetData() {
        const url: string = 'https://localhost:7002/api/Schedules/getOne/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        axios.get(fullUrl)
            .then(response => {

                setSchedule(response.data);
               
               
                console.log('Record aquired successfully: ', response.data);
            })
            .catch(error => {
                console.error('Error aquiring record: ', error);
            });

    }

    function updateData(data: UpdateFormData) {
        data.id = schedule.id;
        data.leagueid = schedule.leagueid;
        const url: string = 'https://localhost:7002/api/Schedules/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
          axios.put(fullUrl, data)
            .then(response => {
                console.log('Record updated successfully: ', response.data);
                navigate("/League/Schedules");
            })
            .catch(error => {
                console.error('Error updating record: ', error);
            });


    }
}



export default ScheduleUpdate;