import { useEffect, useState  } from 'react';
import { MatchFormData } from "./MatchFormData.tsx";
import axios from "axios";
import { ConvertLeague, leagueType } from "../../leagueObject.tsx";
import uparrow from '../../../images/uparrow.png';
import { UpdateFormData } from "../Schedule/UpdateFormData.tsx";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";


function Matches() {
    const [match, setMatch] = useState<MatchFormData[]>();
    
    const [schedule, setSchedule] = useState<UpdateFormData[]>();
    const league: leagueType = ConvertLeague();
    const location = useLocation();
    const id:string = location.search.substring(4);
    const [weekid, setWeekid] = useState(+id);

    useEffect(() => {
        
        GetDates();
        if (weekid !== undefined  && weekid != 0)
            GetData(weekid);
    }, []);

    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        //event.preventDefault();
        const value = event.target.value;
        setWeekid(+value);
        GetData(weekid);
    };

    const Reorder =  (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const button: HTMLButtonElement = event.currentTarget;
        const id: string = button.name;
        const url: string = "https://localhost:7002/api/Matches/Reorder".concat(id);
        axios.get(url)
            .then(response => {
                GetData(weekid);

            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
        GetData(weekid);
    };

    const contents = schedule === undefined
        ? <p><em>Loading ...</em></p>
        :
        <>
            Date: <select onChange={selectChange} defaultValue={weekid }>
                <option value="0" key="0" disabled>Select date</option>
                {schedule?.map(item =>
                    <option key={item.id} value={item.id.toString()}>{item.gameDate}</option>
                )};
            </select>
        </>;

    const matchcontents = match === undefined ? <p></p> :
            <>
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>
                            Exchange Rink
                        </th>
                        <th>
                            Game Date
                        </th>
                        <th>
                            Rink
                        </th>

                        <th>
                            Team 1
                        </th>
                        <th>
                            Team 2
                        </th>
                        <th>
                            Team 1 Score
                        </th>
                        <th>
                            Team 2 Score
                        </th>
                        <th>
                            Team Forfeiting
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {match.map(item =>
                        <tr key={item.id}>
                            <td><button hidden={item.rink == 1} onClick={Reorder} name={item.id.toString()} style={{ backgroundColor: 'white'} }><img src={uparrow} /></button></td>
                            
                            <td>{item.gameDate}</td>
                            <td>{item.rink}</td>
                            <td style={{ color: item.wheelchair1 }} >
                                {item.team1No} ({item.team1})</td>

                            <td style={{ color: item.wheelchair2 }} >
                                {item.team2No} ({item.team2})</td>

                            <td>{item.forFeitId != 0?'' : item.team1Score}</td>
                            <td>{item.forFeitId != 0 ? '': item.team2Score}</td>
                            <td>{item.forFeitId == 0 ? '' : item.forFeitId}</td>
                            <td><Link to="/League/Matches/Update" state={item.id.toString()}>Score</Link></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>;   
        return(
    <div>
        <h2 id="tableLabel">Players in league {league.leagueName}</h2>
                {contents}
                {matchcontents}
                <p style={{color: 'red', textAlign: 'left'} }>Teams with wheel chair members are in red</p>
        
    </div>
    );
    async function GetData(weekid: number) {
    const url: string = "https://localhost:7002/api/matches/".concat(weekid.toString());
      axios.get(url)
          .then(response => {
              
            setMatch(response.data);
           
            
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        })
    }
    async function GetDates() {
        if (schedule === undefined) {
            const url: string = "https://localhost:7002/api/Schedules/".concat(league.id.toString());
            axios.get(url)
                .then(response => {
                    setSchedule(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data: ', error);
                })
        }
    }

    //const UpArrowFunction = (event: React.MouseEvent<HTMLButtonElement>) => {
    //    event.preventDefault();
    //}

    

}

export default Matches;