import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { UpdateFormData, UpdateFormDataSchema } from "./UpdateFormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput, Button } from "flowbite-react";




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
            weekid: 0,
            team1No: 0,
            team2No: 0,
            gameState: ''
           
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
        setMatch({ ...match, [id]: id });
    }, []);

    const contents = match.id === 0
        ? <p><em>Loading ...</em></p> :

        <form onSubmit={handleSubmit(onSubmit)} >
           Rink	Team 1	Team 2	Team 1 Score	Team 2 Score	Team Forfeiting
        <table>

            <input type="hidden" {...register("id", { valueAsNumber: true })} defaultValue={match.id} />
            <tr>
                <td className="Label">Game Date:</td>

                    <td className="Field">{match.gameState } 
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
                        <TextInput {...register('team1Score')} defaultValue={match.team1Score} />
                </td>
                </tr>

                <tr>
                    <td className="Label">Team 2 Score</td>

                    <td className="Field">
                        <TextInput {...register('team2Score')} defaultValue={match.team2Score} />
                    </td>
                </tr>

                <tr>
                    <td className="Label">Forfeit</td>

                    <td className="Field">
                        <select  {...register('forFeitId')} defaultValue={match.forFeitId}>
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
            <h3>Update record for match on {match.gameState}</h3>
            {contents}


        </>
    );


    async function GetData() {
        const url: string = 'https://localhost:7002/api/Matchs/'.concat(id.toString());
        axios.get(url)
            .then(response => {

                setMatch(response.data);


                console.log('Record aquired successfully: ', response.data);
            })
            .catch(error => {
                console.error('Error aquiring record: ', error);
            });

    }

    function updateData(data: UpdateFormData) {
        const url: string = 'https://localhost:7002/api/Matchs/'.concat(id.toString());
        axios.put(url, data)
            .then(response => {
                console.log('Record updated successfully: ', response.data);
                navigate("/Admin/Matchs");
            })
            .catch(error => {
                console.error('Error updating record: ', error);
            });


    }
}



export default MatchUpdate;