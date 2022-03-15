import { useState } from "react";
import { Table, Input } from 'antd';
import { Container, Row, Col, Form, Navbar, Nav, Modal } from 'react-bootstrap';
import '../../components/Navbar/NavbarHeader.css';
import user from "../../assets/user.png";
import chat from "../../assets/chat.svg";
import bell from "../../assets/bell.svg";
// Css
import "../Documentation/ListDocu.css"

const data = [
    {
        key: '1',
        fecha: '02/01/2022 - 13:43',
        actividad: "Visualización mediante QR público",
        detalles: 'Acceso mediante dispositivo móvil, IP: 45.123.0.90',
        documento: "Certificado emitido Expediente: PRT87965",
        usuario: "Usuario anónimo"
    },
    {
        key: '2',
        fecha: '02/01/2022 - 13:43',
        actividad: "Visualización mediante QR público",
        detalles: 'Acceso mediante dispositivo móvil, IP: 45.123.0.90',
        documento: "Certificado emitido Expediente: PRT87965",
        usuario: "Usuario anónimo"
    },
    {
        key: '3',
        fecha: '02/01/2022 - 13:43',
        actividad: "Visualización mediante QR público",
        detalles: 'Acceso mediante dispositivo móvil, IP: 45.123.0.90',
        documento: "Certificado emitido Expediente: PRT87965",
        usuario: "Usuario anónimo"
    },
    {
        key: '4',
        fecha: '02/01/2022 - 13:43',
        actividad: "Visualización mediante QR público",
        detalles: 'Acceso mediante dispositivo móvil, IP: 45.123.0.90',
        documento: "Certificado emitido Expediente: PRT87965",
        usuario: "Usuario anónimo"
    },
    {
        key: '5',
        fecha: '02/01/2022 - 13:43',
        actividad: "Visualización mediante QR público",
        detalles: 'Acceso mediante dispositivo móvil, IP: 45.123.0.90',
        documento: "Certificado emitido Expediente: PRT87965",
        usuario: "Usuario anónimo"
    },
    {
        key: '6',
        fecha: '02/01/2022 - 13:43',
        actividad: "Visualización mediante QR público",
        detalles: 'Acceso mediante dispositivo móvil, IP: 45.123.0.90',
        documento: "Certificado emitido Expediente: PRT87965",
        usuario: "Usuario anónimo"
    },
    {
        key: '7',
        fecha: '02/01/2022 - 13:43',
        actividad: "Visualización mediante QR público",
        detalles: 'Acceso mediante dispositivo móvil, IP: 45.123.0.90',
        documento: "Certificado emitido Expediente: PRT87965",
        usuario: "Usuario anónimo"
    }
];

const columns = [
    {
        title: 'Fecha',
        dataIndex: 'fecha',
        key: 'fecha',
    },
    {
        title: 'Actividad',
        dataIndex: 'actividad',
        key: 'actividad',
    },
    {
        title: 'Detalles',
        dataIndex: 'detalles',
        key: 'detalles',
    },
    {
        title: 'Documento',
        dataIndex: 'documento',
        key: 'documento',
    },
    {
        title: 'Usuario',
        key: 'usuario',
        dataIndex: 'usuario',
    },
];

const actividad = [
    {
        actividad: "Visualización mediante QR público", id: 1
    },
    {
        actividad: "Modificación de metadatos asociados", id: 2
    },
    {
        actividad: "Nuevo documento creado", id: 3
    },
    {
        actividad: "Documento privado,intento de acceso fallido", id: 4
    }
]


export default function Actividad() {
    const [dataSource, setDataSource] = useState(data);
    const [value, setValue] = useState('');

    const FilterByNameInput = (
        <Input
            placeholder="Search Name"
            value={value}
            onChange={e => {
                const currValue = e.target.value;
                setValue(currValue);
                const filteredData = data.filter(entry =>
                    entry.documento.includes(currValue)
                );
                setDataSource(filteredData);
            }}
        />
    );





    return (
        <>
            <Container>
                <Navbar className="nav-css" collapseOnSelect expand="lg" bg="light" variant="light">
                    <h4 className="navTitle">Actividad</h4>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="margin-navbar">
                        <Nav className="me-auto">
                            <Input
                                placeholder="Buscador..."
                                value={value}
                                onChange={e => {
                                    const currValue = e.target.value;
                                    setValue(currValue);
                                    const filteredData = data.filter(entry =>
                                        entry.documento.includes(currValue)
                                    );
                                    setDataSource(filteredData);
                                }}
                            />
                        </Nav>

                        <Nav className="me-auto">
                            <button className="btn btn-outline-secondary  border-bottom-0 border rounded-pill ms-n5 nav-button" type="button">
                                <img className="nav-icon" src={chat} alt="chat" />
                            </button>
                        </Nav>

                        <Nav className="me-auto">
                            <button className="btn btn-outline-secondary  border-bottom-0 border rounded-pill ms-n5 nav-button" type="button">
                                <img className="nav-icon" src={bell} alt="bell" />
                            </button>
                        </Nav>

                        <div className="container-user">
                            <div className="avatar">
                                <img className="user-css" src={user} alt="user" />
                            </div>
                            <div className="user-info-nav">
                                <p className="name-user">Marta Dieguez</p>
                                <p className="rol-user">Super Admin</p>
                            </div>
                        </div>
                    </Navbar.Collapse>
                </Navbar>
                <div className="table-responsive">
                    <Row>
                        <Col lg="1">

                        </Col>

                        <Col lg="3">

                        </Col>

                        <Col lg="3">

                        </Col>

                        <Col lg="3">
                            <div className="SelectBusqueda">
                                <p className="title-filter">TIPO DE ACTIVIDAD</p>

                                <Form.Select className="select-css" aria-label="Default select example">
                                    {
                                        actividad.map(actividad => (
                                            <option key={actividad.id} value={actividad.actividad} >{actividad.actividad}</option>
                                        ))
                                    }
                                </Form.Select>

                            </div>
                        </Col>

                        <Col lg="2">
                            <div className="SelectBusqueda">
                                <p className="title-filter">FECHA DE CARGA</p>

                                <Form.Group controlId="dob">
                                    <Form.Control className="select-css" type="date" name="dob" placeholder="Date of Birth" />
                                </Form.Group>
                            </div>
                        </Col>

                    </Row>
                    <Table columns={columns} dataSource={dataSource} />
                </div>
            </Container>
        </>
    );
}