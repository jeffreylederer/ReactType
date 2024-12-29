import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { UpdateFormData, UpdateFormDataSchema } from "./UpdateFormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, TextInput } from "flowbite-react";
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
        //formState: { errors },

    } = useForm<UpdateFormData>({
        resolver: zodResolver(UpdateFormDataSchema),
    });

    const onSubmit: SubmitHandler<UpdateFormData> = (data) =>updateData(data)

    const navigate = useNavigate();
    
    
    

    useEffect(() => {
        GetData();
        
    });

    const contents = schedule.id === 0
        ? <p><em>Loading ...</em></p> :

        <form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))} >



            <input type="hidden" {...register("id", { valueAsNumber: true })} defaultValue={schedule.id} />
            <input type="hidden" {...register("leagueid", { valueAsNumber: true })} defaultValue={schedule.leagueid} />
           
            <table>
                <tr>
                    <td className="Label">Game Date:</td>

                    <td style={{ textAlign: "left", width: '85%' }}>
                        <Form.Control type="date" {...register('gameDate')} defaultValue={schedule.gameDate} />
                    </td>
                </tr>

                <tr>
                    <td className="Label">Playoffs:</td>

                    <td style={{ textAlign: "left", width: '85%' }}>
                        <Checkbox {...register('playOffs')} defaultChecked={schedule.playOffs } />
                    </td>
                </tr>

                <tr>
                    <td className="Label">Cancelled:</td>

                    <td style={{ textAlign: "left", width: '85%' }}>
                        <Checkbox {...register('cancelled')} defaultChecked={schedule.cancelled} />
                    </td>
                </tr>
                <tr>
                    <td colSpan={1} style={{ textAlign: "center" }}>
                        <TextInput type="submit" />
                        <button onClick={() => navigate(-1)}>Go back to list</button>
                    </td>
                </tr>

            </table>
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