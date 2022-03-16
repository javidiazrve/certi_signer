import { useState } from "react";
import { Table, Input } from 'antd';
import { Container, Row, Col, Form, Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import '../../components/Navbar/NavbarHeader.css';
import user from "../../assets/user.png";
import chat from "../../assets/notification.svg";
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
        fecha: '15/01/2022 - 15:19',
        actividad: "Visualización mediante QR público",
        detalles: 'Acceso mediante ordenador personal, IP: 45.123.0.90',
        documento: "Memoria de calidades Expediente: PTR5656",
        usuario: "Usuario anónimo"
    },
    {
        key: '3',
        fecha: '12/01/2022 - 11:09',
        actividad: "Visualización mediante QR público",
        detalles: 'Acceso mediante dispositivo móvil, IP: 45.123.0.90',
        documento: "Memoria de calidades Expediente: PTR5656",
        usuario: "Usuario anónimo"
    },
    {
        key: '4',
        fecha: '11/01/2022 - 08:09',
        actividad: "Modificación de metadatos asociados",
        detalles: 'Acceso mediante ordenador personal, IP: 45.123.0.90 Visibilidad definida: Acceso bloqueado',
        documento: "Memoria de calidades Expediente: PTR5656",
        usuario: "Julio Marín"
    },
    {
        key: '5',
        fecha: '11/01/2022 - 08:09',
        actividad: "Modificación de metadatos asociados",
        detalles: 'Acceso mediante ordenador personal, IP: 45.123.0.90 Visibilidad definida: Acceso privado mediante QR',
        documento: "Memoria de calidades Expediente: PTR5656",
        usuario: "Julio Marín"
    },
    {
        key: '6',
        fecha: '11/01/2022 - 08:09',
        actividad: "Nuevo documento creado",
        detalles: 'Acceso mediante ordenador personal, IP: 45.123.0.90 Visibilidad definida: Acceso público mediante QR',
        documento: "Certificado emitido Expediente: PRT87965",
        usuario: "Julio Marín"
    },
    {
        key: '7',
        fecha: '10/01/2022 - 15:19',
        actividad: "Documento privado, intento de acceso fallido",
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
        actividad: "Mostrar todo", id: 1
    },
    {
        actividad: "Visualización mediante QR público", id: 2
    },
    {
        actividad: "Modificación de metadatos asociados", id: 3
    },
    {
        actividad: "Nuevo documento creado", id: 4
    },
    {
        actividad: "Documento privado, intento de acceso fallido", id: 5
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

    const handleActivy = (e) => {
        const currValue = e.target.value;
        if (currValue === "Mostrar todo") {
            console.log("Sera que si?");
            return setDataSource(data);
        } else {
            const filteredData = data.filter(entry =>
                entry.actividad.includes(currValue)
            );
            setDataSource(filteredData);
        }

    }


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
                            <span className="input-group-append">
                                <button
                                    className="btn btn-outline-secondary  border-bottom-0 border rounded-pill ms-n5555" type="button">
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                            </span>
                        </Nav>

                        <Nav className="me-auto">
                            <button className="btn btn-outline-secondary  border-bottom-0 border rounded-pill ms-n5 nav-button" type="button">
                                <img src={chat} alt="chat" />
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

                                <Form.Select onClick={handleActivy} className="select-css" aria-label="Default select example">
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