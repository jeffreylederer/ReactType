import { league, user, UserType, LeagueType } from "../components//leagueObject.tsx";
import Menu from "../components/Menu.tsx";


function Welcome() {
    const User: UserType = user();
    const League: LeagueType = league()
        return (
            <>
            <Menu/>
                <h3>Welcome to {League.leagueName}</h3>

           <div className="toLeft">
                    <h4>Current Role: {User.role} </h4>

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