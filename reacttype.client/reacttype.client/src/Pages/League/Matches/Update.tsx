import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { UpdateFormData, UpdateFormDataSchema } from "./UpdateFormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput, Button } from "flowbite-react";
import { MatchFormData } from "./MatchFormData.tsx";




const MatchUpdate = () => {

    const [match, setMatch] = useState(
        {
            id: 0,
            rink: 0,
            team1: '',
            team2: '',
            wheelchair1: '',
            wheelchair2: '',
            team1Score: 0,
            team2Score: 0,
            forFeitId: 0,
            weekId: 0,
            team1No: 0,
            team2No: 0,
            gameDate: ''
           
        }
    );
    const location = useLocation();
    const id: number = location.state;

    const [ hidden, setHidden ] = useState<boolean>();

    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm<UpdateFormData>({
        resolver: zodResolver(UpdateFormDataSchema),

    });

    const ChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        //event.preventDefault();
        const value = event.target.value;
        if (value == '0') {
            setHidden(false);
        }
        else {
            setHidden(true);
        }

    }

    const onSubmit: SubmitHandler<UpdateFormData> = (data) => updateData(data)

    const navigate = useNavigate();

    useEffect(() => {
        GetData(id);
    }, [id]);

    const contents = match.id === 0
        ? <p><em>Loading ...</em></p> :

        <form onSubmit={handleSubmit(onSubmit)} >
           
        <table>

            <input type="hidden" {...register("id", { valueAsNumber: true })} defaultValue={match.id} />
            <tr>
                <td className="Label">Game Date:</td>

                    <td className="Field">{match.gameDate} 
                </td>
            </tr>

            <tr>
              <td className="Label">Rink:</td>

                <td  className="Field">
                        {match.rink }
                </td>
            </tr>

            <tr>
                <td className="Label">Team 1:</td>

                    <td className="Field">{match.team1}
                </td>
                </tr>
                <tr>
                    <td className="Label">Team 2:</td>

                    <td className="Field">{match.team2}
                    </td>
                </tr>

                <tr>
                    <td className="Label">Team 1 Score</td>

                <td  className="Field">
                        <TextInput {...register('team1Score')} defaultValue={match.team1Score} hidden={hidden} />
                </td>
                </tr>

                <tr>
                    <td className="Label">Team 2 Score</td>

                    <td className="Field">
                        <TextInput {...register('team2Score')} defaultValue={match.team2Score} hidden={hidden} />
                    </td>
                </tr>

                <tr>
                    <td className="Label">Forfeit</td>

                    <td className="Field">
                        <select  {...register('forFeitId')} defaultValue={match.forFeitId} onChange={ChangeSelect }>
                            <option value="0" >No Forfeit</option>
                            <option value={match.team1No}>{match.team1No}</option>
                            <option value={match.team2No}>{match.team2No}</option>
                        </select>
                    </td>
                </tr>

            <tr>
                    <td colSpan={1} style={{ textAlign: "center" }}>
                        <Button type="submit" color="gray">Submit</Button>
                        <button onClick={() => navigate(-1)}>Go back to list</button>
                </td>
            </tr>


                <tr><td colSpan={1}>
                    {errors.team1Score && <p className="errorMessage">skip: {errors.team1Score.message}</p>}
                    {errors.team2Score && <p className="errorMessage">viceskip: {errors.team2Score.message}</p>}
                </td></tr>


            </table>
        </form>

    return (
        <>
            <h3>Update record for match on {match.gameDate}</h3>
            {contents}


        </>
    );


    async function GetData(id: number) {
        const url: string = 'https://localhost:7002/api/Matches/GetOne/'.concat(id.toString());
        axios.get(url)
            .then(response => {
                const data: MatchFormData = response.data;
                if (data.forFeitId != 0) {
                    setHidden(true);
                }
                setMatch(response.data);
                


                console.log('Record aquired successfully: ', response.data);
            })
            .catch(error => {
                console.error('Error aquiring record: ', error);
            });

    }

    function updateData(data: UpdateFormData) {
        const url: string = 'https://localhost:7002/api/Matches/'.concat(id.toString());
        if (data.forFeitId != 0) {
            data.team1Score = 0;
            data.team2Score = 0;
        }
        axios.put(url, data)
            .then(response => {
                console.log('Record updated successfully: ', response.data);
                const url: string = "/League/Matches?id=".concat(match.weekId.toString());
                navigate(url);
            })
            .catch(error => {
                console.error('Error updating record: ', error);
            });
    }

   


}



export default MatchUpdate;