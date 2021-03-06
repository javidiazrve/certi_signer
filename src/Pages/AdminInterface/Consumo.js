import { useState } from "react";
import { Table, Input } from 'antd';
import { Container, Row, Col, Form, Navbar, Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import '../../Components/Navbar/NavbarHeader.css';
import circleupload from "../../assets/circleupload.svg";
import moment from 'moment'


import bell from "../../assets/bell.svg";
// Css
import "../Documentation/ListDocu.css"

const data = [
    {
        key: '1',
        fecha: '02/01/2022',
        cliente: "Asesoría integral SL",
        usuario: 'Pedro Marín',
        documento: "Certificado emitido Expediente: PRT87965",
        detalle: " GLKJ67LKJTGHGHLKJ5L6KJLKJGFHTGFLHKJ",
        red: "Ethereum",
        consumo: "0,98 €"
    },
    {
        key: '2',
        fecha: '15/01/2022',
        cliente: "ASANA Certificador Industrial SA",
        usuario: 'Julio Marín',
        documento: "Certificado emitido Expediente: PRT87965",
        detalle: " GLKJ67LKJTGHGHLKJ5L6KJLKJGFHTGFLHKJ",
        red: "Ethereum",
        consumo: "0,86 €"
    },
    {
        key: '3',
        fecha: '12/01/2022',
        cliente: "Asesoría integral SL",
        usuario: 'Julio Marín',
        documento: "Certificado emitido Expediente: PRT87965",
        detalle: " GLKJ67LKJTGHGHLKJ5L6KJLKJGFHTGFLHKJ",
        red: "Solana",
        consumo: "0,98 €"
    },
    {
        key: '4',
        fecha: '11/01/2022',
        cliente: "ASANA Certificador Industrial SA",
        usuario: 'Julio Marín',
        documento: "Certificado emitido Expediente: PRT87965",
        detalle: " GLKJ67LKJTGHGHLKJ5L6KJLKJGFHTGFLHKJ",
        red: "Ethereum",
        consumo: "0,90 €"
    },
    {
        key: '5',
        fecha: '11/01/2022',
        cliente: "Asesoría integral SL",
        usuario: 'Julio Marín',
        documento: "Certificado emitido Expediente: PRT87965",
        detalle: " GLKJ67LKJTGHGHLKJ5L6KJLKJGFHTGFLHKJ",
        red: "Polygon",
        consumo: "0,97 €"
    },
    {
        key: '6',
        fecha: '12/01/2022',
        cliente: "ASANA Certificador Industrial SA",
        usuario: 'Julio Marín',
        documento: "Certificado emitido Expediente: PRT87965",
        detalle: " GLKJ67LKJTGHGHLKJ5L6KJLKJGFHTGFLHKJ",
        red: "Ethereum",
        consumo: "0,91 €"
    },
    {
        key: '7',
        fecha: '10/01/2022',
        cliente: "Asesoría integral SL",
        usuario: 'Julio Marín',
        documento: "Certificado emitido Expediente: PRT87965",
        detalle: " GLKJ67LKJTGHGHLKJ5L6KJLKJGFHTGFLHKJ",
        red: "Ethereum",
        consumo: "0,90 €"
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
        title: 'Usuario',
        dataIndex: 'usuario',
        key: 'usuario',
    },
    {
        title: 'Documento',
        dataIndex: 'documento',
        key: 'documento',
        render: text => <p style={{ textAlign: "left", marginBottom: "0", color: "#102973", textDecoration: "underline" }} >{text}</p>,

    },
    {
        title: 'Detalles',
        key: 'detalle',
        dataIndex: 'detalle',
        render: text => <p style={{ textAlign: "left", marginBottom: "0" }} ><b>Hash:</b>{text}</p>,
    },
    {
        title: 'Red',
        key: 'red',
        dataIndex: 'red',
    },
    {
        title: 'Consumo',
        dataIndex: 'consumo',
        key: 'consumo',
    }
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
        actividad: "Mostrar solo clientes Activos", id: 1
    },
    {
        actividad: "Visualización mediante QR público", id: 2
    },
]


export default function Consumo() {
    const [dataSource, setDataSource] = useState(data);
    const [value, setValue] = useState('');


    const handleFilterDate = (e) => {
        const currValue = e.target.value;

        let today = moment(moment(currValue)).format('DD/MM/YYYY');

        console.log("today?", today);
        if (today === "Invalid date") {
            console.log("Sera que si?");
            return setDataSource(data)
        } else {
            const filteredData = data.filter(entry =>
                entry.fecha.includes(today)
            );
            setDataSource(filteredData);
            //this.setState({ baseData: filteredData })
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
                    <h4 className="navTitle">Consumo</h4>
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
                                        entry.cliente.includes(currValue) || entry.usuario.includes(currValue)
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
                                <p className="title-filter">Clientes</p>

                                <Form.Select onClick={handleClient} className="select-css" aria-label="Default select example">
                                    {
                                        clientes.map(item => (
                                            <option key={item.id} value={item.name} >{item.name}</option>
                                        ))
                                    }
                                </Form.Select>

                            </div>
                        </Col>

                        <Col lg="2" style={{ display: "flex", justifyContent: "end" }}>
                            <div className="SelectBusqueda">
                                <p className="title-filter">Fecha</p>

                                <Form.Group controlId="dob">
                                    <Form.Control onChange={handleFilterDate} className="select-css" type="date" name="dob" placeholder="Date of Birth" />
                                </Form.Group>

                            </div>
                        </Col>

                    </Row>
                    <Table columns={columns} scroll={{ x: 'max-content' }} dataSource={dataSource} />
                </div>
                <Button className="uploadUser">Exportar resultados <img src={circleupload} alt="circleupload" /></Button>

            </Container>
        </>
    );
}