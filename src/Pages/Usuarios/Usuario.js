import { useState } from "react";
import { Table, Input } from 'antd';
import { confirmAlert } from 'react-confirm-alert'

import { Container, Row, Col, Form, Navbar, Nav, Button, Modal, ModalFooter } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import '../../Components/Navbar/NavbarHeader.css';
import circleupload from "../../assets/circleupload.svg";

import bell from "../../assets/bell.svg";
import closedicon from "../../assets/boton-x.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";


// Css
import "../Documentation/ListDocu.css"

const data = [
    {
        id: '1',
        nombre: 'Francisco Marín Román',
        email: "franmarin@demo.com",
        contraseña: "1",
        documentos: '34',
        creacion: "01/01/2022",
        acesso: "01/01/2022 – 13: 34",
        estado: "Activo"
    },
    {
        id: '2',
        nombre: 'Jesús Minar Ruíz',
        email: "jminar@demo.com",
        contraseña: "2",
        documentos: '12',
        creacion: "01/12/2021",
        acesso: "01/12/2021 – 13: 34",
        estado: "Activo"
    },
    {
        id: '3',
        nombre: 'Ester García Sáez',
        email: "egar@demo.com",
        contraseña: "3",
        documentos: '0',
        creacion: "01/11/2021",
        acesso: "01/11/2021 – 13: 34",
        estado: "Bloqueado"
    },
];



const estado = [
    {
        name: "Activo", id: 1
    },
    {
        name: "Bloqueado", id: 2
    }
]



export default function Usuario() {
    const [dataSource, setDataSource] = useState(data);
    const [value, setValue] = useState('');
    const [modalform, setModalform] = useState(false);
    const [user, setUser] = useState("");
    const [mail, setMail] = useState("");
    const [state, setState] = useState(estado);
    const [password, setPassword] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: "1",
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: "2",
        },
        {
            title: 'Documentos',
            dataIndex: 'documentos',
            key: "3",
        },
        {
            title: 'F.creación',
            dataIndex: 'creacion',
            key: "4",
        },
        {
            title: 'Último Acceso',
            key: "5",
            dataIndex: 'acesso',
        },
        {
            title: 'Estado',
            key: "6",
            dataIndex: 'estado',
        },
        {
            key: "7",
            title: "Actions",
            render: (record) => {
                return (
                    <>
                        <EditOutlined
                            onClick={() => {
                                onEditUser(record);
                            }}
                        />
                        <DeleteOutlined
                            onClick={() => {
                                ModalConfirm(record);
                            }}
                            style={{ color: "red", marginLeft: 12 }}
                        />
                    </>
                );
            },
        },
    ];


    const handleModal = () => {
        setModalform(true)
    }

    const handleClosedModal = () => {
        setModalform(false)
        resetEditing()
    }

    const handleSubmit = () => {

        const randomNumber = parseInt(Math.random() * 1000);
        const newUser = {
            key: randomNumber,
            nombre: user,
            email: mail,
            contraseña: password,
            documentos: "1" + randomNumber,
            creacion: new Date().toLocaleDateString(),
            acesso: new Date().toLocaleString(),
            estado: state
        };
        setDataSource((pre) => {
            return [...pre, newUser];
        });

        setModalform(false);
        setMail("")
        setUser("")
        setPassword("")

    }

    const ModalConfirm = (record) => {

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui-main'>
                        <div className='custom-ui-chill'>
                            <h1>¿Estas seguro?</h1>
                            <p>¿Quieres eliminar este Usuario?</p>
                                <Button onClick={onClose} style={{ background: "red", marginRight: "20px" }}>Cancelar</Button>

                                <Button
                                    onClick={() => {
                                        setDataSource((pre) => {
                                            return pre.filter((student) => student.id !== record.id);
                                        });
                                        onClose();
                                    }}
                                >
                                    Eliminar
                                </Button>
                        </div>

                    </div >
                );
            }
        });
    }


    const onEditUser = (record) => {
        setIsEditing(true);
        setEditingUser({ ...record });
    };
    const resetEditing = () => {
        setIsEditing(false);
        setEditingUser(null);
    };




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
                    <Table columns={columns} scroll={{ x: 'max-content' }} dataSource={dataSource} />
                    <Button className="uploadUser" style={{ marginLeft: "20px" }} onClick={handleModal}>Crear nuevo usuario <img src={circleupload} alt="circleupload" /></Button>

                </div>

                <Modal size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered style={{ padding: "40px" }}
                    show={isEditing}
                >
                    <div className="Content">
                        <form>

                            <Modal.Header>
                                <p className="modal-title" style={{ fontSize: "24px" }}>Edición de la cuenta de usuario</p>
                                <Button className="out-css-header" onClick={handleClosedModal} ><img className="closed-css-modal" src={closedicon} alt="closedicon" />
                                </Button>
                            </Modal.Header>
                            <Modal.Body>
                                <Row>
                                    <Col lg="6">
                                        <div className="form-group">
                                            <label className="title-filter-modal">Nombre</label>
                                            <Input className="form-control newCategory-css" style={{ marginLeft: "0px" }} onChange={(e) => {
                                                setEditingUser((pre) => {
                                                    return { ...pre, nombre: e.target.value };
                                                });
                                            }} value={editingUser?.nombre} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: "5%" }}>
                                    <Col lg="6">
                                        <div className="form-group">
                                            <label className="title-filter-modal">Correo Electrónico</label>
                                            <Input className="form-control newCategory-css" style={{ marginLeft: "0px" }} onChange={(e) => {
                                                setEditingUser((pre) => {
                                                    return { ...pre, email: e.target.value };
                                                });
                                            }} value={editingUser?.email} />
                                        </div>
                                    </Col>
                                    <Col lg="6">
                                        <div className="form-group">
                                            <label className="title-filter-modal">Contraseña</label>
                                            <Input className="form-control newCategory-css" style={{ marginLeft: "0px" }} onChange={(e) => {
                                                setEditingUser((pre) => {
                                                    return { ...pre, contraseña: e.target.value };
                                                });
                                            }} value={editingUser?.contraseña} />
                                        </div>
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "5%" }}>
                                    <Col lg="6">
                                        <div className="SelectBusqueda">
                                            <p className="title-filter-modal">Estado</p>

                                            <Form.Select className="select-css" onChange={(e) => {
                                                setEditingUser((pre) => {
                                                    return { ...pre, estado: e.target.value };
                                                });
                                            }} value={editingUser?.estado} aria-label="Default select example">
                                                {
                                                    estado.map(item => (
                                                        <option key={item.id} value={item.name} >{item.name}</option>
                                                    ))
                                                }
                                            </Form.Select>


                                        </div>
                                    </Col>
                                </Row>

                            </Modal.Body>

                            <ModalFooter>
                                <Button className="out-modal" onClick={handleClosedModal} >
                                    Salir
                                </Button>

                                <Button className="uploadLogotipo" onClick={() => {
                                    setDataSource((pre) => {
                                        return pre.map((student) => {
                                            if (student.id === editingUser.id) {
                                                return editingUser;
                                            } else {
                                                return student;
                                            }
                                        });
                                    });
                                    resetEditing();
                                }}>
                                    Guardar cambios
                                </Button>
                            </ModalFooter>
                        </form>

                    </div>
                </Modal>




                <Modal size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered style={{ padding: "40px" }}
                    show={modalform}
                >
                    <div className="Content">
                        <form>

                            <Modal.Header>
                                <p className="modal-title" style={{ fontSize: "24px" }}>Creación de Usuario</p>
                                <Button className="out-css-header" onClick={handleClosedModal} ><img className="closed-css-modal" src={closedicon} alt="closedicon" />
                                </Button>
                            </Modal.Header>
                            <Modal.Body>
                                <Row>
                                    <Col lg="6">
                                        <div className="form-group">
                                            <label className="title-filter-modal">Nombre</label>
                                            <Input className="form-control newCategory-css" style={{ marginLeft: "0px" }} onChange={(e) => setUser(e.target.value)} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: "5%" }}>
                                    <Col lg="6">
                                        <div className="form-group">
                                            <label className="title-filter-modal">Correo Electrónico</label>
                                            <Input className="form-control newCategory-css" style={{ marginLeft: "0px" }} onChange={(e) => setMail(e.target.value)} />
                                        </div>
                                    </Col>
                                    <Col lg="6">
                                        <div className="form-group">
                                            <label className="title-filter-modal">Contraseña</label>
                                            <Input className="form-control newCategory-css" style={{ marginLeft: "0px" }} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "5%" }}>
                                    <Col lg="6">
                                        <div className="SelectBusqueda">
                                            <p className="title-filter-modal">Estado</p>

                                            <Form.Select className="select-css" onChange={(e) => setState(e.target.value)} aria-label="Default select example">
                                                {
                                                    estado.map(item => (
                                                        <option key={item.id} value={item.name} >{item.name}</option>
                                                    ))
                                                }
                                            </Form.Select>

                                        </div>
                                    </Col>
                                </Row>

                            </Modal.Body>

                            <ModalFooter>
                                <Button className="out-modal" onClick={handleClosedModal} >
                                    Salir
                                </Button>

                                <Button className="uploadLogotipo" onClick={handleSubmit}>
                                    Guardar cambios
                                </Button>
                            </ModalFooter>
                        </form>

                    </div>
                </Modal>





            </Container>
        </>
    );
}