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
        cliente: "Asesoría integral SL",
        fecha: '02/01/2022 13:43',
        mensualidad: '200 €',
        consumon: "18",
        consumo: "180 €",
        total: "Certificado emitido Expediente: PRT87965",
        estado: "Pagado",
        pdf: "Descargar PDF"
    },
    {
        key: '2',
        cliente: "ASANA Certificador Industrial SA",
        fecha: '15/01/2022 15:19',
        mensualidad: '200 €',
        consumon: "12",
        consumo: "225 €",
        total: "Memoria de calidades Expediente: PTR5656",
        estado: "Pagado",
        pdf: "Descargar PDF"
    },
    {
        key: '3',
        fecha: '12/01/2022 11:09',
        cliente: "Asesoría integral SL",
        mensualidad: '200 €',
        consumon: "25",
        consumo: "310 €",
        total: "Memoria de calidades Expediente: PTR5656",
        estado: "Pendiente",
        pdf: "Descargar PDF"
    },
    {
        key: '4',
        fecha: '11/01/2022 08:09',
        cliente: "ASANA Certificador Industrial SA",
        mensualidad: '200 €',
        consumon: "26",
        consumo: "305 €",
        total: "Memoria de calidades Expediente: PTR5656",
        estado: "Pagado",
        pdf: "Descargar PDF"
    },
    {
        key: '5',
        fecha: '11/01/2022 08:09',
        cliente: "Asesoría integral SL",
        mensualidad: '200 €',
        consumon: "21",
        consumo: "250 €",
        total: "Memoria de calidades Expediente: PTR5656",
        estado: "Pagado",
        pdf: "Descargar PDF"
    },
    {
        key: '6',
        fecha: '12/01/2022 11:09',
        cliente: "ASANA Certificador Industrial SA",
        mensualidad: '200 €',
        consumon: "22",
        consumo: "225 €",
        total: "Memoria de calidades Expediente: PTR5656",
        estado: "Pagado",
        pdf: "Descargar PDF"
    },
];

const columns = [
    {
        title: 'Cliente',
        dataIndex: 'cliente',
        key: 'cliente',
    },
    {
        title: 'Fecha',
        dataIndex: 'fecha',
        key: 'fecha',
    },
    {
        title: 'Mensualidad',
        dataIndex: 'mensualidad',
        key: 'mensualidad',
    },
    {
        title: 'Consumo (N. )',
        key: 'consumon',
        dataIndex: 'consumon',
    },
    {
        title: 'Consumo €',
        dataIndex: 'consumo',
        key: 'consumo',
    },
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
    },
    {
        title: 'Estado',
        dataIndex: 'estado',
        key: 'estado',
    },
    {
        title: ' ',
        dataIndex: 'pdf',
        key: 'pdf',
        render: text => <Button style={{ textAlign: "left", marginBottom: "0", color: "#102973", textDecoration: "underline", background: "transparent", border: "0", padding: "0" }} >{text}</Button>,
    },
];


const estado = [
    {
        name: "Pagados y pendientes", id: 0
    },
    {
        name: "Pagado", id: 1
    },
    {
        name: "Pendiente", id: 2
    },
]


export default function ActividadAdmin() {
    const [dataSource, setDataSource] = useState(data);
    const [value, setValue] = useState('');


    const handleState = (e) => {
        const currValue = e.target.value;
        if (currValue === "Pagados y pendientes") {
            console.log("Sera que si?");
            return setDataSource(data);
        } else {
            const filteredData = data.filter(entry =>
                entry.estado.includes(currValue)
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
                    <h4 className="navTitle">Facturación</h4>
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
                                <p className="title-filter">ESTADO</p>

                                <Form.Select onClick={handleState} className="select-css" aria-label="Default select example">
                                    {
                                        estado.map(item => (
                                            <option key={item.id} value={item.name} >{item.name}</option>
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
                                        estado.map(actividad => (
                                            <option key={actividad.id} value={actividad.name} >{actividad.name}</option>
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