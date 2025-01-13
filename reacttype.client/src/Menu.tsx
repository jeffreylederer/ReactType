
import { UserType  } from "./Pages/leagueObject.tsx";
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";

function Menu() {

    const login: UserType = localStorage.getItem("login") === null ? null : JSON.parse(localStorage.getItem("login") as string);
    
    const navigate = useNavigate();
    const [showSiteAdmin] = useState<boolean>(login !== null && login.role == "SiteAdmin" );
    const [showAdmin] = useState<boolean>(login !== null && (login.role == "Admin" || showSiteAdmin ));
    const [showLeague] = useState<boolean>(localStorage.getItem("league") !== null);
    const username: string = login === null ? "" : login.username;

    useEffect(() => {
        if (localStorage.getItem("login") === null) {
            navigate("/Login");
        }
    }, [navigate]);


       

    return (
        <>
       
        
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">League</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/Membership">Membership</NavLink>
                            </li>
                            <li className="nav-item dropdown" style={{display: showLeague ? "inline": "none" } }>
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                   League
                                </a>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to="/League/Players">Players</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/League/Schedule">Schedule</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/League/Teams">Teams</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/League/Matches?id=0">Teams</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/League/Byes">Byes Report</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/League/ScheduleReport">Schedule Report</NavLink></li>
                                    <li style={{ display: showAdmin ? "inline" : "none" }}>---------------------</li>
                                    <li style={{ display: showAdmin ? "inline" : "none" }}><NavLink className="dropdown-item" to="/League/CreateMatches">Create Matches</NavLink></li>
                                    <li style={{ display: showAdmin ? "inline" : "none" }}><NavLink className="dropdown-item" to="/League/ClearMatches">Delete Matches</NavLink></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown" style={{ display: showSiteAdmin ? "inline" : "none" }}>
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Admin
                                </a>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to="/Admin/Users">Users</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/Admin/Leagues">Leagues</NavLink></li>
                            </ul>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link " aria-current="page" to="/About">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link " aria-current="page" to="/Contact">Contact</NavLink>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link " aria-current="page">Hello! {username}</span>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link " aria-current="page" to="/Logoff">Logoff</NavLink>
                            </li>
                        </ul>
                        
                    </div>
                </div>
            </nav>

      </>
        
    );


}



export default Menu;