import { useState } from "react";
import { Table, Input } from 'antd';
import { Container, Row, Col, Form, Navbar, Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import '../../Components/Navbar/NavbarHeader.css';
import circleupload from "../../assets/circleupload.svg";


import bell from "../../assets/bell.svg";
// Css
import "../Documentation/ListDocu.css"

const data = [
    {
        key: '1',
        fecha: '02/01/2022 13:43',
        cliente: "Asesoría integral SL",
        actividad: 'Visualización mediante QR público',
        detalle: "Acceso mediante dispositivo móvil, IP: 45.123.0.90",
        consumo: "0,98 €",
        documento: "Certificado emitido Expediente: PRT87965",
        usuario: "Usuario anónimo"
    },
    {
        key: '2',
        fecha: '15/01/2022 15:19',
        cliente: "ASANA Certificador Industrial SA",
        actividad: 'Visualización mediante QR público',
        detalle: "Acceso mediante ordenador personal, IP: 45.123.0.90",
        consumo: "0,86 €",
        documento: "Memoria de calidades Expediente: PTR5656",
        usuario: "Usuario anónimo"
    },
    {
        key: '3',
        fecha: '12/01/2022 11:09',
        cliente: "Asesoría integral SL",
        actividad: 'Visualización mediante QR público',
        detalle: "Acceso mediante dispositivo móvil, IP: 45.123.0.90",
        consumo: "0,98 €",
        documento: "Memoria de calidades Expediente: PTR5656",
        usuario: "Julio Marín"
    },
    {
        key: '4',
        fecha: '11/01/2022 08:09',
        cliente: "ASANA Certificador Industrial SA",
        actividad: 'Modificación de metadatos asociados',
        detalle: "Acceso mediante ordenador personal, IP: 45.123.0.90 Visibilidad definida: Acceso bloqueado",
        consumo: "0,90 €",
        documento: "Memoria de calidades Expediente: PTR5656",
        usuario: "Julio Marín"
    },
    {
        key: '5',
        fecha: '11/01/2022 08:09',
        cliente: "Asesoría integral SL",
        actividad: 'Modificación de metadatos asociados',
        detalle: "Acceso mediante ordenador personal, IP: 45.123.0.90 Visibilidad definida: Acceso privado mediante QR",
        consumo: "0,97 €",
        documento: "Memoria de calidades Expediente: PTR5656",
        usuario: "Julio Marín"
    },
    {
        key: '6',
        fecha: '12/01/2022 11:09',
        cliente: "ASANA Certificador Industrial SA",
        actividad: 'Nuevo documento creado',
        detalle: "Acceso mediante ordenador personal, IP: 45.123.0.90 Visibilidad definida: Acceso público mediante QR",
        consumo: "0,91 €",
        documento: "Memoria de calidades Expediente: PTR5656",
        usuario: "Julio Marín"
    },
    {
        key: '7',
        fecha: '10/01/2022 15:19',
        cliente: "Asesoría integral SL",
        actividad: 'Documento privado, intento de acceso fallido',
        detalle: "Acceso mediante dispositivo móvil, IP: 45.123.0.90",
        consumo:  "0,90 €",
        documento: "Memoria de calidades Expediente: PTR5656",
        usuario: "Usuario anónimo"
    },
];

const columns = [
    {
        title: 'Fecha',
        dataIndex: 'fecha',
        key: 'fecha',
    },
    {
        title: 'Cliente',
        dataIndex: 'cliente',
        key: 'cliente',
    },
    {
        title: 'Actividad',
        dataIndex: 'actividad',
        key: 'actividad',
    },
    {
        title: 'Detalles',
        key: 'detalle',
        dataIndex: 'detalle',
    },
    {
        title: 'Consumo',
        dataIndex: 'consumo',
        key: 'consumo',
    },
    {
        title: 'Documento',
        dataIndex: 'documento',
        key: 'documento',
        render: text => <p style={{ textAlign: "left", marginBottom: "0", color: "#102973", textDecoration: "underline" }} >{text}</p>,
    },
    {
        title: 'Usuario',
        dataIndex: 'usuario',
        key: 'usuario',
    },
];

const clientes = [
    {
        name: "Todos los clientes", id: 0
    },
    {
        name: "Asesoría integral SL", id: 1
    },
    {
        name: "ASANA Certificador Industrial SA", id: 2
    }
]

const actividad = [
    {
        actividad: "Todos los tipos", id: 1
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
    },
]


export default function ActividadAdmin() {
    const [dataSource, setDataSource] = useState(data);
    const [value, setValue] = useState('');


    const handleActivy = (e) => {
        const currValue = e.target.value;
        if (currValue === "Todos los tipos") {
            console.log("Sera que si?");
            return setDataSource(data);
        } else {
            const filteredData = data.filter(entry =>
                entry.actividad.includes(currValue)
            );
            setDataSource(filteredData);
        }

    }

    const handleClient = (e) => {
        const currValue = e.target.value;
        if (currValue === "Todos los clientes") {
            console.log("Sera que si?");
            return setDataSource(data);
        } else {
            const filteredData = data.filter(entry =>
                entry.cliente.includes(currValue)
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
                                        entry.cliente.includes(currValue)
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



                        <div className="container-user">
                            <div className="avatar">
                                <button className="btn btn-outline-secondary  border-bottom-0 border rounded-pill ms-n5 nav-button" type="button">
                                    <img className="nav-icon" src={bell} alt="bell" />
                                </button>
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

                        <Col lg="4">

                        </Col>

                        <Col lg="4">

                        </Col>

                        <Col lg="2" style={{ display: "flex", justifyContent: "end" }}>
                            <div className="SelectBusqueda">
                                <p className="title-filter">TIPO DE ACTIVIDAD</p>

                                <Form.Select onClick={handleActivy} className="select-css" aria-label="Default select example">
                                    {
                                        actividad.map(item => (
                                            <option key={item.id} value={item.actividad} >{item.actividad}</option>
                                        ))
                                    }
                                </Form.Select>

                            </div>
                        </Col>

                        <Col lg="2" style={{ display: "flex", justifyContent: "end" }}>
                            <div className="SelectBusqueda">
                                <p className="title-filter">Fecha</p>

                                <Form.Select  className="select-css" aria-label="Default select example">
                                    {
                                        actividad.map(actividad => (
                                            <option key={actividad.id} value={actividad.actividad} >{actividad.actividad}</option>
                                        ))
                                    }
                                </Form.Select>

                            </div>
                        </Col>

                    </Row>
                    <Table columns={columns} dataSource={dataSource} />
                </div>
                <Button className="uploadUser">Exportar resultados <img src={circleupload} alt="circleupload" /></Button>

            </Container>
        </>
    );
}