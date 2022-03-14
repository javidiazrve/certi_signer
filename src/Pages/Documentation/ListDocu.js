import React, { Component, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Form, Button, Navbar, Nav, Modal, Label } from 'react-bootstrap';
import '../../components/Navbar/NavbarHeader.css';
import user from "../../assets/user.jpg";
import './Modal.css'


// Css
import "./ListDocu.css"

const tablaDocuments = [
    { categoria: "Certificación Calidad ISO 9000", tipo: "Certificado diplomado", expediente: "PRT69786", cuenta: "Grupo Aliseda SA", etiqueta: "ISO9000, EF2021", documento: "certificado emitido", fecha: "22/01/2022", visto: "15" },
    { categoria: "Certificación Calidad ISO 9000", tipo: "Certificado ampliado", expediente: "PRT78698", cuenta: "Industrias YGUS SL", etiqueta: "ISO9000, EF2021", documento: "certificado emitido", fecha: "15/01/2022", visto: "15" },
    { categoria: "Memoria de calidades ISO 9001", tipo: "Folleto técnico", expediente: "PRT78697", cuenta: "Solis Ingeniería SA", etiqueta: "ISO9001, EF2021", documento: "Memoria de calidades", fecha: "12/01/2022", visto: "0" },
    { categoria: "Certificación Calidad ISO 9000", tipo: "Certificado diploma", expediente: "490 (+91)", cuenta: "Grupo Córtex SA", etiqueta: "ISO9000, EF2021", documento: "certificado emitido", fecha: "13/01/2022", visto: "112" }
];

const categorias = [
    {
        categoria: "Certificación Calidad ISO 9000", id: 1
    },
    {
        categoria: "Memoria de calidades ISO 9001", id: 2
    },
]

const tipos = [
    {
        tipo: "Certificado diplomado", id: 1
    },
    {
        tipo: "Certificado ampliado", id: 2
    },
    {
        tipo: "Folleto técnico", id: 3
    }
]

const visibilidad = [
    {
        seleccion: "Acesso público mediante QR", id: 1
    },
    {
        seleccion: "Acesso privado QR con contraseña", id: 2
    },
]

const cuentas = [
    {
        cuenta: "Grupo Aliseda SA", id: 1
    },
    {
        cuenta: "Industrias YGUS SL", id: 2
    },
    {
        cuenta: "Solis Ingeniería SA", id: 3
    },
    {
        cuenta: "Grupo Córtex SA", id: 4
    },
]


const paginacionOpciones = {
    rowsPerPageText: 'Filas por Página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
}

class ListDocu extends Component {



    constructor(props) {
        super(props);

        this.state = {
            busqueda: '',
            cuentas: [],
            columnas: [],
            modal: false,
            modalScreen: 0,
            password: false,
            categorias: '',
            type: '',
            visibilidad: '',
            etiqueta: '',
            cliente: '',
            expediente: '',
            name: '',
            selectedFile: null
        };
    }

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    /*onFileUpload = () => {
    
        // Create an object of formData
        const formData = new FormData();
      
        // Update the formData object
        formData.append(
          "myFile",
          this.state.selectedFile,
          this.state.selectedFile.name
        );
      
        // Details of the uploaded file
        console.log(this.state.selectedFile);
      
        // Request made to the backend api
        // Send formData object
        axios.post("api/uploadfile", formData);
      };*/

    modalOpen = () => {
        this.setState({ modal: true });
    };

    backModal = () => {
        this.setState({
            modalScreen: 0
        })
    }

    modalClose = () => {
        this.setState({
            modal: false,
            modalScreen: 0
        });
    };

    handleSubmit = () => {
        this.setState(
            {
                modalScreen: 1,
            }
        );
    };

    handleCliente = async (e) => {
        await this.setState({ cliente: e.target.value })
    }

    handleVisibilidad = async (e) => {
        console.log(e.target.value);
        await this.setState({ visibilidad: e.target.value });
        if (e.target.value === "Acesso privado QR con contraseña") {
            this.setState({
                password: true
            })
        } else {
            this.setState({
                password: false
            })
        }
    }

    handleCategory = async (e) => {
        await this.setState({ categorias: e.target.value })
    }

    handleType = async (e) => {
        await this.setState({ type: e.target.value })
    }

    onChange = async e => {
        e.persist();
        await this.setState({ busqueda: e.target.value });
        this.filtrarElementos();
    }

    handleEtiquetas = async (e) => {
        await this.setState({ etiqueta: e.target.value })
    }

    handleExpediente = async (e) => {
        await this.setState({ expediente: e.target.value })
    }

    handleNombre = async (e) => {
        await this.setState({ name: e.target.value })
    }

    asignarColumnas = () => {

        const columnas = [
            {
                name: 'CATEGORÍA',
                selector: 'categoria',
                sortable: false
            },
            {
                name: 'TIPO',
                selector: 'tipo',
                sortable: false
            },
            {
                name: 'EXPEDIENTE',
                selector: 'expediente',
                sortable: false,
                //grow: 3
            },
            {
                name: 'CUENTA CLIENTE',
                selector: 'cuenta',
                sortable: false,
            },
            {
                name: 'ETIQUETAS',
                selector: 'etiqueta',
                sortable: false,
            },
            {
                name: 'DOCUMENTO',
                selector: 'documento',
                sortable: false,
            },
            {
                name: 'FECHA',
                selector: 'fecha',
                sortable: true,
            },
            {
                name: 'VISTO',
                selector: 'visto',
                sortable: false,
            }
        ];

        this.setState({ columnas: columnas });
    }

    filtrarElementos = () => {
        var search = tablaDocuments.filter(item => {
            if (item.fecha.toString().includes(this.state.busqueda) ||
                item.cuenta.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.state.busqueda) ||
                item.expediente.toLowerCase().includes(this.state.busqueda)
            ) {
                return item;
            }
        });
        this.setState({ cuentas: search });
    }

    crearIndex = () => {
        var contador = 1;
        tablaDocuments.map(elemento => {
            elemento["id"] = contador;
            contador++;
        })
    }

    componentDidMount() {
        this.crearIndex();
        this.asignarColumnas();
        this.setState({ cuentas: tablaDocuments });
    }

    render() {
        const { modal, modalScreen } = this.state;

        return (
            <>

                <Container className="margin-top">
                    <Navbar className="nav-css" collapseOnSelect expand="lg" bg="light" variant="light">
                        <h4 className="navTitle">Documentación</h4>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav" className="margin-navbar">
                            <Nav className="me-auto">
                                <div className="input-group">
                                    <input className="form-control border-end-0 border rounded-pill filterSearch"
                                        name="busqueda"
                                        placeholder="Buscador..."
                                        type="text"
                                        value={this.state.busqueda}
                                        onChange={this.onChange}
                                        id="example-search-input" />
                                    <span className="input-group-append">
                                        <button className="btn btn-outline-secondary  border-bottom-0 border rounded-pill ms-n5" type="button">
                                            <FontAwesomeIcon icon={faSearch} />
                                        </button>
                                    </span>
                                </div>
                            </Nav>

                            <Nav className="me-auto">
                                <button className="btn btn-outline-secondary  border-bottom-0 border rounded-pill ms-n5" type="button">
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                            </Nav>

                            <Nav className="me-auto">
                                <button className="btn btn-outline-secondary  border-bottom-0 border rounded-pill ms-n5" type="button">
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                            </Nav>

                            <div className="container-user">
                                <div className="avatar">
                                    <img className="user-css" src={user} alt="user" />
                                </div>
                                <div className="user-info-nav">
                                    <p className="name-user">Rizwan Khan</p>
                                    <p className="rol-user">rizwankhan@gmail.com</p>
                                </div>
                            </div>
                        </Navbar.Collapse>
                    </Navbar>
                    <div className="table-responsive">
                        <Row>
                            <Col lg="1">

                            </Col>

                            <Col lg="3">
                                <div className="SelectBusqueda">
                                    <p className="title-filter">CATEGORÍA</p>
                                    <Form.Select className="select-css" aria-label="Default select example">
                                        <option>Selecciona Categoría</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </div>
                            </Col>

                            <Col lg="3">
                                <div className="SelectBusqueda">
                                    <p className="title-filter">TIPO</p>
                                    <Form.Select className="select-css" aria-label="Default select example">
                                        <option>Selecciona Tipo</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </div>
                            </Col>

                            <Col lg="3">
                                <div className="SelectBusqueda">
                                    <p className="title-filter">FECHA DE CARGA</p>
                                    <Form.Select className="select-css" aria-label="Default select example">
                                        <option>Selecciona Fecha</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </div>
                            </Col>

                            <Col lg="2">
                                <div className="SelectBusqueda">
                                    <p className="title-filter">ESTADO</p>
                                    <Form.Select className="select-css" aria-label="Default select example">
                                        {
                                            tablaDocuments.map(estado => (
                                                <option key={estado.tipo} value={estado.tipo}>{estado.tipo}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </div>
                            </Col>

                        </Row>

                        <DataTable
                            columns={this.state.columnas}
                            data={this.state.cuentas}
                            //title=""
                            pagination
                            paginationComponentOptions={paginacionOpciones}
                            fixedHeader
                            fixedHeaderScrollHeight="600px"
                            noDataComponent={<span>No se encontró ningún elemento</span>}
                        />
                    </div>
                    <Button className="uploadButton" onClick={this.modalOpen}>Cargar nuevo documento</Button>

                    <Modal show={modal} size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                        {modalScreen === 0 && (
                            <>
                                <Modal.Header>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                        Nuevo documento
                                    </Modal.Title>
                                    <Button className="out-css" onClick={this.modalClose}>X</Button>

                                </Modal.Header>

                                <Modal.Body>
                                    <Form>

                                        <p className="modal-title">ACCESO PÚBLICO MEDIANTE QR</p>
                                        <Row className="row-select">
                                            <Col lg="4">
                                                <div className="SelectBusqueda">
                                                    <p className="title-filter-modal">Categoría</p>
                                                    <Form.Select onClick={this.handleCategory} className="select-css-modal" aria-label="Default select example">
                                                        {
                                                            categorias.map(valor => (
                                                                <option key={valor.id} value={valor.categoria} >{valor.categoria}</option>
                                                            ))
                                                        }
                                                    </Form.Select>
                                                    <a className="redColor">Añadir nueva categoría</a>
                                                </div>
                                            </Col>

                                            <Col lg="4">
                                                <div className="SelectBusqueda">
                                                    <p className="title-filter-modal">Tipo</p>
                                                    <Form.Select onClick={this.handleType} className="select-css-modal" aria-label="Default select example">
                                                        {
                                                            tipos.map(valor => (
                                                                <option key={valor.id} value={valor.tipo} >{valor.tipo}</option>
                                                            ))
                                                        }
                                                    </Form.Select>
                                                    <a className="redColor">Añadir nuevo tipo</a>
                                                </div>
                                            </Col>

                                            <Col lg="4">
                                                <div className="SelectBusqueda">
                                                    <p className="title-filter-modal">Visibilidad</p>
                                                    <Form.Select onClick={this.handleVisibilidad} className="select-css-modal" aria-label="Default select example">
                                                        {
                                                            visibilidad.map(valor => (
                                                                <option key={valor.id} value={valor.seleccion} >{valor.seleccion}</option>
                                                            ))
                                                        }
                                                    </Form.Select>
                                                </div>
                                            </Col>

                                        </Row>
                                        <Row className="row-select">
                                            <Col lg="4">
                                                <Form.Group className="mb-3" controlId="formBasicName">
                                                    <Form.Label className="title-filter-modal">Nombre Descripción</Form.Label>
                                                    <Form.Control className="input-Form" type="text" placeholder="" onChange={this.handleNombre} />
                                                </Form.Group>
                                            </Col>

                                            <Col lg="4">
                                                <Form.Group className="mb-3" controlId="formBasicExpediente">
                                                    <Form.Label className="title-filter-modal">Expediente Asociado</Form.Label>
                                                    <Form.Control className="input-Form" type="text" placeholder="" onChange={this.handleExpediente} />
                                                </Form.Group>
                                            </Col>

                                            <Col lg="4">
                                                <div className="SelectBusqueda">
                                                    <p className="title-filter-modal">Cuenta Cliente Vinculado</p>
                                                    <Form.Select onClick={this.handleCliente} className="select-css-modal" aria-label="Default select example">
                                                        {
                                                            cuentas.map(estado => (
                                                                <option key={estado.id} value={estado.cuenta}>{estado.cuenta}</option>
                                                            ))
                                                        }
                                                    </Form.Select>
                                                    <a className="redColor">Añadir nueva cuenta cliente</a>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row className="row-select">
                                            <Col lg="4">
                                                <Form.Group className="mb-3" controlId="formBasicEtiquetas">
                                                    <Form.Label className="title-filter-modal">Etiquetas</Form.Label>
                                                    <Form.Control className="input-Form" type="text" placeholder="" onChange={this.handleEtiquetas} />
                                                </Form.Group>
                                            </Col>

                                            <Col lg="8">
                                                <input type="file" onChange={this.onFileChange} />
                                                <Button className="uploadButton">Seleccionar el documento a cargar</Button>
                                            </Col>

                                        </Row>
                                        {this.state.password === true && (
                                            <>
                                                <Row className="row-select">
                                                    <Col lg="4">
                                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                                            <Form.Label className="title-filter-modal">Contraseña de acceso</Form.Label>
                                                            <Form.Control className="input-Form" type="text" placeholder="" />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </>
                                        )}
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button className="out-css" onClick={this.modalClose}>Salir</Button>
                                    <Button className="next-css" onClick={this.handleSubmit}>Siguiente Paso</Button>
                                </Modal.Footer>
                            </>
                        )}
                        {modalScreen === 1 && (
                            <>
                                <Modal.Header>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                        Nuevo documento
                                    </Modal.Title>
                                    <Button className="out-css" onClick={this.modalClose}>X</Button>

                                </Modal.Header>

                                <Modal.Body>
                                    <Form>

                                        <p className="modal-title">INFORMACIÓN REGISTRADA</p>
                                        <Row className="row-select">
                                            <Col lg="4">
                                                <div className="SelectBusqueda">
                                                    <Form.Group className="mb-3" controlId="formBasicName">
                                                        <Form.Label className="title-filter-modal">Categoría</Form.Label>
                                                        <Form.Control className="input-Form" type="text" value={this.state.categorias} placeholder="" disabled />
                                                    </Form.Group>
                                                    <a className="redColor">Cambiar</a>
                                                </div>
                                            </Col>

                                            <Col lg="4">
                                                <div className="SelectBusqueda">
                                                    <Form.Group className="mb-3" controlId="formBasicName">
                                                        <Form.Label className="title-filter-modal">Tipo</Form.Label>
                                                        <Form.Control className="input-Form" type="text" value={this.state.type} placeholder="" disabled />
                                                    </Form.Group>
                                                    <a className="redColor">Cambiar</a>
                                                </div>
                                            </Col>

                                            <Col lg="4">
                                                <div className="SelectBusqueda">
                                                    <Form.Group className="mb-3" controlId="formBasicName">
                                                        <Form.Label className="title-filter-modal">Visibilidad</Form.Label>
                                                        <Form.Control className="input-Form" type="text" value={this.state.visibilidad} placeholder="" disabled />
                                                    </Form.Group>
                                                </div>
                                            </Col>

                                        </Row>
                                        <Row className="row-select">
                                            <Col lg="4">
                                                <Form.Group className="mb-3" controlId="formBasicName">
                                                    <Form.Label className="title-filter-modal">Nombre o Descripción:</Form.Label>
                                                    <Form.Control className="input-Form" type="text" placeholder="" value={this.state.name} disabled />
                                                </Form.Group>
                                            </Col>

                                            <Col lg="4">
                                                <Form.Group className="mb-3" controlId="formBasicExpediente">
                                                    <Form.Label className="title-filter-modal">Expediente:</Form.Label>
                                                    <Form.Control className="input-Form" type="text" placeholder="" value={this.state.expediente} disabled />
                                                </Form.Group>
                                            </Col>

                                            <Col lg="4">
                                                <Form.Group className="mb-3" controlId="formBasicCuenta">
                                                    <Form.Label className="title-filter-modal">Cuenta cliente:</Form.Label>
                                                    <Form.Control className="input-Form" type="text" placeholder="" value={this.state.cliente} disabled />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row className="row-select">
                                            <Col lg="4">
                                                <Form.Group className="mb-3" controlId="formBasicName">
                                                    <Form.Label className="title-filter-modal">Documento a publicar:</Form.Label>
                                                    <Form.Control className="input-Form" type="text" placeholder="" />
                                                </Form.Group>
                                            </Col>

                                            <Col lg="4">
                                                <Form.Group className="mb-3" controlId="formBasicExpediente">
                                                    <Form.Label className="title-filter-modal">Etiquetas:</Form.Label>
                                                    <Form.Control className="input-Form" type="text" placeholder="" value={this.state.etiqueta} disabled />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <div className="info-box">
                                            <p className="info-text">Se va a publicar el documento en una red pública de tipo Blockchain. Por favor, revise antes que toda la información es correcta.</p>
                                        </div>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button className="out-css" onClick={this.backModal}>Volver atrás</Button>
                                    <Button className="next-css" onClick={this.handleSubmit}>Continuar</Button>
                                </Modal.Footer>
                            </>
                        )}
                    </Modal>

                </Container>
            </>
        );
    }
}

export default ListDocu;
