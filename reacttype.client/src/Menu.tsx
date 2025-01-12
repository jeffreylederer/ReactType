
import { UserType } from "./Pages/leagueObject.tsx";
//import { useEffect, useState } from 'react';
//import { useNavigate,NavLink } from "react-router-dom";
import { useState } from 'react';
import './Dropdown.css';
import { NavLink } from "react-router-dom";

function Menu() {

    const login: UserType = localStorage.getItem("login") === null ? null : JSON.parse(localStorage.getItem("login") as string);
    
    //const navigate = useNavigate();
    const [showSiteAdmin] = useState<boolean>(login !== null && login.role == "SiteAdmin" );
    const [showAdmin] = useState<boolean>(login !== null && (login.role == "Admin" || showSiteAdmin ));
    const [showLeague] = useState<boolean>(localStorage.getItem("league") !== null);
    const username: string = login === null ? "" : login.username;

    //useEffect(() => {
    //    if (localStorage.getItem("login") === null) {
    //        navigate("/Login");
    //    }
    //}, [navigate]);

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const [isOpenAdmin, setIsOpenAdmin] = useState(false);

    const toggleDropdownAdmin = () => {
        setIsOpenAdmin(!isOpenAdmin);
    };

    

    return (
        <>
            <ul className="no-bullets">
                <li className="li-top"><NavLink to="/">Home</NavLink></li>
                <li className="li-top"><NavLink to="/Membership">Membership</NavLink></li>

                <li className="dropdown" style={{ display: showLeague ? "inline" : "none" }}>
                <NavLink to="#"  onClick={toggleDropdown}>
                        League Play<i className={"fas fa-caret-${isOpenAdmin ? 'up' : 'down'}"}></i>
                </NavLink>
                {isOpen && (
                    <ul className="dropdown-content no-bullets">
                        <li><NavLink to="/League/Players">Players</NavLink></li>
                        <li><NavLink to="/League/Schedule">Schedule</NavLink></li>
                        <li><NavLink to="/League/Teams">Teams</NavLink></li>
                        <li><NavLink to="/League/Matches">Matches</NavLink></li>
                        <li><NavLink to="/League/Byes">Byes Report</NavLink></li>
                        <li><NavLink to="/League/ScheduleReport">Schedule Report</NavLink></li>
                            <li style={{ display: showAdmin ? "inline" : "none" }}>----------------------------</li>
                            <li><NavLink to="/League/CreateMatches" style={{ display: showAdmin ? "inline" : "none" }}>Create Matches</NavLink></li>
                            <li><NavLink to="/League/ClearMatches" style={{ display: showAdmin ? "inline" : "none" }} >Delete Matches</NavLink></li>

                    </ul>
                )}
                </li>
                <li className="dropdown" style={{ display: showSiteAdmin ? "inline" : "none" }}>
                    <NavLink to="#" onClick={toggleDropdownAdmin}>
                        Admin<i className={"fas fa-caret-${isOpenAdmin ? 'up' : 'down'}"}></i>
                    </NavLink>
                    {isOpenAdmin && (
                        <ul className="dropdown-content no-bullets">
                            <li><NavLink to="/Admin/Users">Users</NavLink></li>
                            <li><NavLink to="/Admin/Leagues">Leagues</NavLink></li>
                        </ul>
                    )}
                </li>
                <li className="li-top"><NavLink to="/About">About</NavLink></li>
                <li className="li-top"><NavLink to="/Contact">Contact</NavLink></li>
                <li className="li-top"><NavLink to="#" style={{ pointerEvents: "none" }}>Hello {username}</NavLink></li>
                <li className="li-top"><NavLink to="/UpdatePassword">Change Password</NavLink></li>
                <li className="li-top"><NavLink reloadDocument to="/Logoff">Logoff</NavLink></li>

            </ul>
        </>
                   
    );
}



export default Menu;