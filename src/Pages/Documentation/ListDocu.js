import React, { Component, useState } from 'react';
//import DataTable from 'react-data-table-component';
import { Table, Tag, Input } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Form, Button, Navbar, Nav, Modal, Label } from 'react-bootstrap';
import '../../components/Navbar/NavbarHeader.css';
import user from "../../assets/user.png";
import chat from "../../assets/chat.svg";
import bell from "../../assets/bell.svg";
import closedicon from "../../assets/boton-x.png";
import './Modal.css'
import { WithContext as ReactTags } from 'react-tag-input';




// Css
import "./ListDocu.css"

const columns = [
    {
        title: 'Categoría',
        dataIndex: 'categoria',
        key: 'categoria',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Tipo',
        dataIndex: 'tipo',
        key: 'tipo',
    },
    {
        title: 'Expediente',
        dataIndex: 'expediente',
        key: 'expediente',
        render: text => <span style={{ fontWeight: "600" }} >{text}</span>,
    },
    {
        title: 'Cuenta',
        dataIndex: 'cuenta',
        key: 'cuenta',
    },
    {
        title: 'Etiqueta',
        key: 'etiquetas',
        dataIndex: 'etiquetas',
        render: etiquetas => (
            <>
                {etiquetas.map(tag => {
                    let color = tag;
                    let marginRight = tag;
                    if (tag === "ISO9000") {
                        color = '#FF9900';
                        marginRight = '10px'
                    } if (tag === "ISO9001") {
                        color = '#102973';
                        marginRight = '10px'
                    } if (tag === "EF2021") {
                        color = 'black'
                    }
                    return (
                        <Tag style={{ color, marginRight }} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Documento',
        dataIndex: 'documento',
        key: 'documento',
    },
    {
        title: 'Fecha',
        dataIndex: 'fecha',
        key: 'fecha',
    },
    {
        title: 'Visto',
        dataIndex: 'visto',
        key: 'visto',
    }
];


const data = [
    {
        key: '1',
        categoria: "Certificación Calidad ISO 9000",
        tipo: "Certificado diplomado",
        expediente: "PRT69786",
        cuenta: "Grupo Aliseda SA",
        etiquetas: ['ISO9000', 'EF2021'],
        documento: "certificado emitido",
        fecha: "22/01/2022",
        visto: "15",
    },
    {
        key: '2',
        categoria: "Certificación Calidad ISO 9000",
        tipo: "Certificado ampliado",
        expediente: "PRT78698",
        cuenta: "Industrias YGUS SL",
        etiquetas: ['ISO9000', 'EF2021'],
        documento: "certificado emitido",
        fecha: "15/01/2022",
        visto: "15"
    },
    {
        key: '3',
        categoria: "Memoria de calidades ISO 9001",
        tipo: "Folleto técnico",
        expediente: "PRT78697",
        cuenta: "Solis Ingeniería SA",
        etiquetas: ['ISO9001', 'EF2021'],
        documento: "Memoria de calidades",
        fecha: "12/01/2022",
        visto: "0"
    },
    {
        key: '4',
        categoria: "Certificación Calidad ISO 9000",
        tipo: "Certificado diploma",
        expediente: "490 (+91)",
        cuenta: "Grupo Córtex SA",
        etiquetas: ['ISO9000', 'EF2021'],
        documento: "certificado emitido",
        fecha: "13/01/2022",
        visto: "112"
    }
];

const categoriasArr = [
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

class ListDocu extends Component {



    constructor(props) {
        super(props);

        this.state = {
            busqueda: '',
            cuentas: [],
            columnas: [],
            modal: false,
            modalScreen: 0,
            showCategory: false,
            password: false,
            newCategory: '',
            categorias: '',
            categoriasArr: [
                {
                    categoria: "Certificación Calidad ISO 9000", id: 1
                },
                {
                    categoria: "Memoria de calidades ISO 9001", id: 2
                },
            ],
            type: '',
            visibilidad: '',
            //etiqueta: '',
            cliente: '',
            expediente: '',
            name: '',
            selectedFile: null,
            filterTable: null,
            columns: columns,
            baseData: data,
            etiqueta: []
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
    modalCategory = () => {
        this.setState({ showCategory: true })
    }

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

    modalClosedCategory = () => {
        this.setState({
            showCategory: false
        })
    }

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


    componentDidMount() {
        //this.crearIndex();
        //this.asignarColumnas();
        //this.setState({ cuentas: tablaDocuments });
    }

    search = value => {
        const { baseData } = this.state;
        console.log("PASS", { value });

        const filterTable = baseData.filter(o =>
            Object.keys(o).some(k =>
                String(o[k])
                    .toLowerCase()
                    .includes(value.toLowerCase())
            )
        );

        this.setState({ filterTable });
    };

    onChangeDate(date, dateString) {
        console.log(date, dateString);
    }


    onAddStudent = () => {
        const randomNumber = parseInt(Math.random() * 1000);
        const newStudent = {
            key: randomNumber,
            categoria: this.state.categorias,
            tipo: this.state.type,
            expediente: this.state.expediente,
            cuenta: this.state.cliente,
            etiquetas: ['ISO9001', 'EF2021'],
            documento: this.state.name,
            fecha: "12/01/2022",
            visto: 0
        };

        this.setState({ baseData: [...this.state.baseData, newStudent], modal: false, });

    };


    handleDelete = i => {
        // setTags(tags.filter((tag, index) => index !== i));
    };

    handleAddition = tag => {
        //setTags([...tags, tag]);
        this.setState({ etiqueta: [...this.state.etiqueta, tag] })
        console.log("Etiquetas", this.state.etiqueta);
    };

    handleDrag = (tag, currPos, newPos) => {
        //const newTags = tags.slice();

        //newTags.splice(currPos, 1);
        //newTags.splice(newPos, 0, tag);

        // re-render
        //setTags(newTags);
    };

    handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    addNewcategory = async (e) => {

        this.setState({ newCategory: e.target.value });

    }

    addNewcategory2 = async () => {
        const newCategoryArr = {
            categoria: this.state.newCategory, id: 3
        }
        await this.setState({ categoriasArr: [newCategoryArr, ...this.state.categoriasArr], showCategory: false, })
        console.log("Es nuevo?", this.state.categoriasArr)
    }



    render() {
        const { modal, modalScreen, showCategory } = this.state;
        const { filterTable, columns, baseData } = this.state;


        return (
            <>

                <Container className="margin-top">
                    <Navbar className="nav-css" collapseOnSelect expand="lg" bg="light" variant="light">
                        <h4 className="navTitle">Documentación</h4>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav" className="margin-navbar">
                            <Nav className="me-auto">
                                <Input.Search className=""
                                    name="busqueda"
                                    placeholder="Buscador..."
                                    type="text"
                                    enterButton
                                    onSearch={this.search}
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
                                <div className="SelectBusqueda">
                                    <p className="title-filter">CATEGORÍA</p>
                                    <Form.Select className="select-css" aria-label="Default select example">
                                        {
                                            this.state.categoriasArr.map(valor => (
                                                <option key={valor.id} value={valor.categoria} >{valor.categoria}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </div>
                            </Col>

                            <Col lg="3">
                                <div className="SelectBusqueda">
                                    <p className="title-filter">TIPO</p>
                                    <Form.Select className="select-css" aria-label="Default select example">
                                        {
                                            tipos.map(valor => (
                                                <option key={valor.id} value={valor.tipo} >{valor.tipo}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </div>
                            </Col>

                            <Col lg="3">
                                <div className="SelectBusqueda">
                                    <p className="title-filter">FECHA DE CARGA</p>

                                    <Form.Group controlId="dob">
                                        <Form.Control className="select-css" type="date" name="dob" placeholder="Date of Birth" />
                                    </Form.Group>

                                </div>
                            </Col>

                            <Col lg="2">
                                <div className="SelectBusqueda">
                                    <p className="title-filter">ESTADO</p>
                                    <Form.Select className="select-css" aria-label="Default select example">
                                        <option>Selecciona Fecha</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </div>
                            </Col>

                        </Row>

                        <Table columns={columns} dataSource={filterTable == null ? baseData : filterTable} />
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
                                    <Button className="out-css-header" onClick={this.modalClose}><img className="closed-css" src={closedicon} alt="closedicon" />
                                    </Button>

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
                                                            this.state.categoriasArr.map(valor => (
                                                                <option key={valor.id} value={valor.categoria} >{valor.categoria}</option>
                                                            ))
                                                        }
                                                    </Form.Select>
                                                    <Button className="redColorModal1" onClick={this.modalCategory}>Añadir nueva categoría</Button>
                                                </div>
                                            </Col>
                                            <Modal show={showCategory} aria-labelledby="contained-modal-title-vcenter"
                                                centered>
                                                <Modal.Header>
                                                    <p className="modal-title">Agregar nueva Categoría</p>
                                                    <Button className="out-css-header" onClick={this.modalClosedCategory}><img className="closed-css-modal" src={closedicon} alt="closedicon" />
                                                    </Button>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form.Group className="mb-3" controlId="formBasicName">
                                                        <Form.Label className="title-filter-modal">Nombre de la categoría</Form.Label>
                                                        <Form.Control className="input-Form newCategory-css" type="text" placeholder="" value={this.state.newCategory} onChange={this.addNewcategory} />
                                                    </Form.Group>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button className="out-csz" onClick={this.modalClosedCategory}>
                                                        Cancelar
                                                    </Button>
                                                    <Button className="next-css" onClick={this.addNewcategory2}>
                                                        Agregar Categoría
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
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
                                                    <Button className="redColorModal1">Añadir nuevo tipo</Button>
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
                                                    <Form.Control className="input-Form newCategory-css" type="text" placeholder="" onChange={this.handleNombre} />
                                                </Form.Group>
                                            </Col>

                                            <Col lg="4">
                                                <Form.Group className="mb-3" controlId="formBasicExpediente">
                                                    <Form.Label className="title-filter-modal">Expediente Asociado</Form.Label>
                                                    <Form.Control className="input-Form newCategory-css" type="text" placeholder="" onChange={this.handleExpediente} />
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
                                                    <a className="redColorModal1">Añadir nueva cuenta cliente</a>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row className="row-select">
                                            <Col lg="4">
                                                <Form.Group className="mb-3" controlId="formBasicEtiquetas">
                                                    <Form.Label className="title-filter-modal">Etiquetas</Form.Label>
                                                    <ReactTags
                                                        classNames="newCategory-css"
                                                        tags={this.state.etiqueta}
                                                        handleDelete={this.handleDelete}
                                                        handleAddition={this.handleAddition}
                                                        handleDrag={this.handleDrag}
                                                        handleTagClick={this.handleTagClick}
                                                        inputFieldPosition="bottom"
                                                        autocomplete
                                                    />
                                                </Form.Group>

                                            </Col>

                                            <Col lg="8">
                                                <label htmlFor="files" className="uploadButton btn">Seleccionar el documento a cargar</label>
                                                <input id="files" style={{ visibility: "hidden" }} type="file" onChange={this.onFileChange} />
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
                                    <Button className="out-csz" onClick={this.modalClose}>Salir</Button>
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
                                                        <Form.Control className="input-Form newCategory-css" type="text" value={this.state.categorias} placeholder="" disabled />
                                                    </Form.Group>
                                                    <a className="redColor">Cambiar</a>
                                                </div>
                                            </Col>

                                            <Col lg="4">
                                                <div className="SelectBusqueda">
                                                    <Form.Group className="mb-3" controlId="formBasicName">
                                                        <Form.Label className="title-filter-modal">Tipo</Form.Label>
                                                        <Form.Control className="input-Form newCategory-css" type="text" value={this.state.type} placeholder="" disabled />
                                                    </Form.Group>
                                                    <a className="redColor">Cambiar</a>
                                                </div>
                                            </Col>

                                            <Col lg="4">
                                                <div className="SelectBusqueda">
                                                    <Form.Group className="mb-3" controlId="formBasicName">
                                                        <Form.Label className="title-filter-modal">Visibilidad</Form.Label>
                                                        <Form.Control className="input-Form newCategory-css" type="text" value={this.state.visibilidad} placeholder="" disabled />
                                                    </Form.Group>
                                                </div>
                                            </Col>

                                        </Row>
                                        <Row className="row-select">
                                            <Col lg="4">
                                                <Form.Group className="mb-3" controlId="formBasicName">
                                                    <Form.Label className="title-filter-modal">Nombre o Descripción:</Form.Label>
                                                    <Form.Control className="input-Form newCategory-css" type="text" placeholder="" value={this.state.name} disabled />
                                                </Form.Group>
                                            </Col>

                                            <Col lg="4">
                                                <Form.Group className="mb-3" controlId="formBasicExpediente">
                                                    <Form.Label className="title-filter-modal">Expediente:</Form.Label>
                                                    <Form.Control className="input-Form newCategory-css" type="text" placeholder="" value={this.state.expediente} disabled />
                                                </Form.Group>
                                            </Col>

                                            <Col lg="4">
                                                <Form.Group className="mb-3" controlId="formBasicCuenta">
                                                    <Form.Label className="title-filter-modal">Cuenta cliente:</Form.Label>
                                                    <Form.Control className="input-Form newCategory-css" type="text" placeholder="" value={this.state.cliente} disabled />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row className="row-select">
                                            <Col lg="4">
                                                <Form.Group className="mb-3" controlId="formBasicName">
                                                    <Form.Label className="title-filter-modal">Documento a publicar:</Form.Label>
                                                    <Form.Control className="input-Form newCategory-css" type="text" placeholder="" value={this.state.selectedFile.name} disabled />
                                                </Form.Group>
                                            </Col>

                                            <Col lg="4">
                                                <Form.Group className="mb-3" controlId="formBasicExpediente">
                                                    <Form.Label className="title-filter-modal">Etiquetas:</Form.Label>
                                                </Form.Group>
                                                {
                                                    this.state.etiqueta.map(valor => (
                                                        <span key={valor.id}>{valor.text}</span>
                                                    ))
                                                }
                                            </Col>
                                        </Row>
                                        <div className="info-box">
                                            <p className="info-text">Se va a publicar el documento en una red pública de tipo Blockchain. Por favor, revise antes que toda la información es correcta.</p>
                                        </div>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button className="out-csz" onClick={this.backModal}>Volver atrás</Button>
                                    <Button className="next-css" onClick={this.onAddStudent}>Continuar</Button>
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
