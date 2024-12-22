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
import { ConvertLeague, leagueType } from "../../leagueObject.tsx";

const ScheduleCreate = () => {
    const league: leagueType = ConvertLeague();
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
            <h2>Create new game date for league {league.leagueName}</h2>
            <form onSubmit={handleSubmit(onSubmit)} >
                <table>
                    <input type="hidden" defaultValue={league.id} {...register('leagueid')} />
                    <tr>
                        <td className="Label">Playoffs:</td>

                        <td style={{ textAlign: "left", width: '85%' }}>
                            <Form.Control type="date" {...register('gameDate')} />
                        </td>
                    </tr>

                    <tr>
                        <td className="Label">Playoffs:</td>

                        <td style={{ textAlign: "left", width: '85%' }}>
                            <Checkbox {...register('playOffs')} />
                        </td>
                    </tr>
                
                    <tr>
                        <td className="Label">Cancelled:</td>

                        <td style={{ textAlign: "left", width: '85%' }}>
                            <Checkbox {...register('cancelled')}  />
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={1}  style={{ textAlign: "center" }}>
                            <TextInput type="submit" />
                            <button onClick={() => navigate(-1)}>Go back to list</button>
                        </td>
                    </tr>
                    
                    {errors.leagueid && <p className="errorMessage">{errors.leagueid.message}</p>}
                    {errors.gameDate && <p className="errorMessage">{errors.gameDate.message}</p>}
                    {errors.cancelled && <p className="errorMessage">{errors.cancelled.message}</p>}
                    {errors.playOffs && <p className="errorMessage">{errors.playOffs.message}</p>}
                    

                </table>
            </form>
            
        </>
    );


    

}



export default ScheduleCreate;