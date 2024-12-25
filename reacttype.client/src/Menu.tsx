import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useCookies } from 'react-cookie';
import { UserTypeDetail } from "./Pages/Admin/Login/UserTypeDetail.tsx";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Menu() {
    const [cookies] = useCookies(['league', 'login']);  
    const data: UserTypeDetail = cookies.login === undefined ? { id: 0, role: "Observer", username: "unknown" } : cookies.login;
    const navigate = useNavigate();
    useEffect(() => {
        if (cookies.login === undefined) {
            navigate("/Login");
        }
    }, []);
   
    return (
        <Navbar expand="lg" className="bg-body-tertiary" hidden={cookies.login === undefined}>
            <Container>
                <Navbar.Brand href="/">Leagues</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/*<Nav.Link href="/">Home</Nav.Link>*/}
                        <Nav.Link href="/Membership">Membership</Nav.Link>
                        <NavDropdown title="League Play" id="basic-nav-dropdown" hidden={cookies.league == undefined }>
                            <NavDropdown.Item href="/League/Players">Players</NavDropdown.Item>
                            <NavDropdown.Item href="/League/Schedules">Schedules</NavDropdown.Item>
                            <NavDropdown.Item href="/League/Teams">Teams</NavDropdown.Item>
                            <NavDropdown.Item href="/League/Matches?id=0">Matches</NavDropdown.Item>
                            <NavDropdown.Item href="/League/ScheduleReport">Schedule Report</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/League/CreateMatches">Create Matches</NavDropdown.Item>
                            <NavDropdown.Item href="/League/ClearSchedule">Delete Matches</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/League/Playoffs">Playoff Matches</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Admin" id="basic-nav-dropdown" hidden={data.role != "SiteAdmin" }>
                            <NavDropdown.Item href="/Admin/Users">Users</NavDropdown.Item>
                            <NavDropdown.Item href="/Admin/Leagues">Leagues</NavDropdown.Item>
                            <NavDropdown.Item href="/Admin/ErrorLog">Error Log</NavDropdown.Item>
                        </NavDropdown>
                        
                        <Nav.Link href="/About">About</Nav.Link>
                        <Nav.Link href="/Contact" style={{ width: '100px', textAlign: 'left' }} >Contact</Nav.Link>
                        <Nav.Link href="#" disabled>{"Hello ".concat(data.username)}</Nav.Link>
                        <Nav.Link href="/UpdatePassword">Change Password</Nav.Link>
                        <Nav.Link href="/Logoff">Log Off</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default Menu;