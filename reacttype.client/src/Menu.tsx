import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useCookies } from 'react-cookie';

function Menu() {
    const [cookies] = useCookies(['league','login','userName']);  
    const hide: boolean = cookies.league === undefined;
    const hideall: boolean = cookies.login === undefined;
    return (
        <Navbar expand="lg" className="bg-body-tertiary" hidden={hideall}>
            <Container>
                <Navbar.Brand href="/">Leagues</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/*<Nav.Link href="/">Home</Nav.Link>*/}
                        <Nav.Link href="/Membership">Membership</Nav.Link>
                        <NavDropdown title="League Play" id="basic-nav-dropdown" hidden={hide }>
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
                        <NavDropdown title="Admin" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/Admin/Users">Users</NavDropdown.Item>
                            <NavDropdown.Item href="/Admin/Leagues">Leagues</NavDropdown.Item>
                            <NavDropdown.Item href="/Admin/ErrorLog">Error Log</NavDropdown.Item>
                        </NavDropdown>
                        
                        <Nav.Link href="/About">About</Nav.Link>
                        <Nav.Link href="/Contact" style={{ width: '100px', textAlign: 'left' }} >Contact</Nav.Link>
                        <Nav.Link href="#" disabled>{"Hello ".concat(cookies.userName)}</Nav.Link>
                        <Nav.Link href="/UpdatePassword">Change Password</Nav.Link>
                        <Nav.Link href="/Logoff">Log Off</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default Menu;