import { useState } from "react";
import { Table, Input } from 'antd';
import { Container, Row, Col, Form, Navbar, Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import '../../Components/Navbar/NavbarHeader.css';
import user from "../../assets/user.png";
import chat from "../../assets/notification.svg";
import bell from "../../assets/bell.svg";
// Css
import "../Documentation/ListDocu.css"

const data = [
    {
        key: '1',
        nombre: 'Francisco Marín Román',
        email: "franmarin@demo.com",
        documentos: '34',
        creacion: "01/01/2022",
        acesso: "01/01/2022 – 13: 34",
        estado: "Activo"
    },
    {
        key: '2',
        nombre: 'Jesús Minar Ruíz',
        email: "jminar@demo.com",
        documentos: '12',
        creacion: "01/12/2021",
        acesso: "01/12/2021 – 13: 34",
        estado: "Activo"
    },
    {
        key: '3',
        nombre: 'Ester García Sáez',
        email: "egar@demo.com",
        documentos: '0',
        creacion: "01/11/2021",
        acesso: "01/11/2021 – 13: 34",
        estado: "Bloqueado"
    },
];

const columns = [
    {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Documentos',
        dataIndex: 'documentos',
        key: 'documentos',
    },
    {
        title: 'F.creación',
        dataIndex: 'creacion',
        key: 'creacion',
    },
    {
        title: 'Último Acceso',
        key: 'acesso',
        dataIndex: 'acesso',
    },
    {
        title: 'Estado',
        key: 'estado',
        dataIndex: 'estado',
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


export default function Usuario() {
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
                    <h4 className="navTitle">Usuario</h4>
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
                    <Table columns={columns} dataSource={dataSource} />
                </div>
                <Button className="uploadButton">Crear nuevo usuario</Button>
            </Container>
        </>
    );
}