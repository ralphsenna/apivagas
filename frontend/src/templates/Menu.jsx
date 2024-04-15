import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

export default function Menu(props) 
{
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid style={{padding: '0 50px'}}>
                <Navbar.Brand><Link to="/">Menu</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                            <NavDropdown.Item><Link to="/candidato">Candidatos</Link></NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item><Link to="/vaga">Vagas</Link></NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item><Link to="/inscricao">Inscrições</Link></NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
