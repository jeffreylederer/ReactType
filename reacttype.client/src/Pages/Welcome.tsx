import { LeagueType, UserType } from "./leagueObject.tsx";
import Menu from '../Menu.tsx';

function Welcome() {
    
    const league: LeagueType = JSON.parse(localStorage.getItem("league") as string);
    const login: UserType = JSON.parse(localStorage.getItem("login") as string);

    
    
    
        return (
            <>
            <Menu/>
            <h3>Welcome to {league.leagueName}</h3>

           <div className="toLeft">
                <h4>Current Role: {login.role} </h4>

                <dl >
                    <dt>Observers</dt>
                    <dd>They can view all screens and reports in the league </dd>
                </dl>
                <dl >
                    <dt>Scorers</dt>
                    <dd>They can score matches and view all screens and reports in the league </dd>
                </dl>
                <dl >
                    <dt>League Administrators</dt>
                    <dd>They can edit the membership, players and schedule in the league, create and score matches </dd>
                </dl>
                <dl >
                    <dt>Site Administrators</dt>
                    <dd>They can be league administrator for any league and create leagues and users. </dd>
                </dl>
        </div >  
    </>
        );

    
}

export default Welcome;