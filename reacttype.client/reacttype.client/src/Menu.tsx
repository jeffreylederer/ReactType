
import { UserType } from "./Pages/leagueObject.tsx";
import { useEffect, useState } from 'react';
import { useNavigate,NavLink } from "react-router-dom";


function Menu() {

    const login: UserType = localStorage.getItem("login") === null ? null : JSON.parse(localStorage.getItem("login") as string);
    //const league: LeagueType = localStorage.getItem("league") === null ? null : JSON.parse(localStorage.getItem("league") as string);

    const navigate = useNavigate();
    const [hideSiteAdmin] = useState<boolean>(login == null ? false : (login.role != "SiteAdmin" ? false : true));
    const [hideAdmin] = useState<boolean>(login === null ? false : (login.role != "Admin" || hideSiteAdmin ? false : true));
    const [hideLeague] = useState<boolean>(localStorage.getItem("league") === null);
    const username: string = login === null ? "" : login.username;

    useEffect(() => {
        if (localStorage.getItem("login") === null) {
            navigate("/Login");
        }
        
         
       
    },[navigate]);

    return (
    
            <>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" ></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" ></script>
            <div className="navbar navbar-default navbar-fixed-top" >
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <NavLink to="/" className="navbar-brand" >Leagues</NavLink>
                    </div>
                    <div className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/Membership">Membership</NavLink></li>

                            
                            <li className="menu-item dropdown" style={{ display: hideLeague? "none": "inline"} } >
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">League Play<b className="caret"></b></a>
                                <ul className="dropdown-menu">
                                    <li><NavLink to="/League/Players">Players</NavLink></li>
                                    <li><NavLink to="/League/Schedule">Schedule</NavLink></li>
                                    <li><NavLink to="/League/Teams">Teams</NavLink></li>
                                    <li><NavLink to="/League/Matches">Matches</NavLink></li>
                                    <li><NavLink to="/League/Byes">Byes Report</NavLink></li>
                                    <li><NavLink to="/League/ScheduleReport">Schedule Report</NavLink></li>
                                    <li style={{ display: hideAdmin ? "none" : "inline" }}>----------------------------</li>
                                    <li><NavLink to="/League/CreateMatches" style={{ display: hideAdmin ? "none" : "inline" }}>Create Matches</NavLink></li>
                                    <li><NavLink to="/League/ClearMatches" style={{ display: hideAdmin ? "none" : "inline" }} >Delete Matches</NavLink></li>
                                 </ul>
                            </li>
                             

                         
                            <li className="menu-item dropdown" style={{ display: hideSiteAdmin ? "none" : "inline" }} >
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Admin<b className="caret"></b></a>
                                <ul className="dropdown-menu">
                                    <li><NavLink to="/Admin//Users">Users</NavLink></li>
                                    <li><NavLink to="/Admin//Leagues">Leagues</NavLink></li>
                                 </ul>
                            </li>
                            
                    
                            <li><NavLink to="/About">About</NavLink></li>
                            <li><NavLink to="/Contact">Contact</NavLink></li>
                            <li><NavLink to="#" style={{ pointerEvents: "none" }}>Hello {username}</NavLink></li>
                            <li><NavLink to="/UpdatePassword">Change Password</NavLink></li>
                            <li><NavLink reloadDocument  to="/Logoff">Logoff</NavLink></li>
                        </ul>
                    </div>
            </div>
        </div>

        </>
    
                   
    );
}



export default Menu;