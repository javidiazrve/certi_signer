import React from 'react';
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';
// Assets
import logo from '../../assets/LogoCerti.png';
// Css
import './NavbarHeader.css';


function NavbarHeader() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <img src={logo} className="nav-logo" alt="logo" />
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="margin-navbar">
                        <Nav className="me-auto">
                            <Nav.Link href="#" className="navTitle">DOCUMENTACIÓN</Nav.Link>
                            <Nav.Link className="navTitle">|</Nav.Link>
                            <Nav.Link href="#" className="navTitle">ACTIVIDAD</Nav.Link>
                            <Nav.Link className="navTitle">|</Nav.Link>
                            <Nav.Link href="#" className="navTitle">FACTURACIÓN</Nav.Link>
                            <Nav.Link className="navTitle">|</Nav.Link>
                            <Nav.Link href="#" className="navTitle">USUARIOS </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#" className="navTitle">Cerrar Sesión</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarHeader