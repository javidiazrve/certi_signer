import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Form, Button, Navbar, NavDropdown, Nav, } from 'react-bootstrap';
import '../../components/Navbar/NavbarHeader.css';
import user from "../../assets/user.jpg";

// Css
import "./ListDocu.css"

const tablaDocuments = [
    { categoria: "Certificación Calidad ISO 9000", tipo: "Certificado diplomado", expediente: "PRT69786", cuenta: "Grupo Aliseda SA", etiqueta: "ISO9000, EF2021", documento: "certificado emitido", fecha: "22/01/2022", visto: "15" },
    { categoria: "Certificación Calidad ISO 9000", tipo: "Certificado ampliado", expediente: "PRT78698", cuenta: "Industrias YGUS SL", etiqueta: "ISO9000, EF2021", documento: "certificado emitido", fecha: "15/01/2022", visto: "15" },
    { categoria: "Memoria de calidades ISO 9001", tipo: "Folleto técnico", expediente: "PRT78697", cuenta: "Solis Ingeniería SA", etiqueta: "ISO9001, EF2021", documento: "Memoria de calidades", fecha: "12/01/2022", visto: "0" },
    { categoria: "Certificación Calidad ISO 9000", tipo: "Certificado diploma", expediente: "490 (+91)", cuenta: "Grupo Córtex SA", etiqueta: "ISO9000, EF2021", documento: "certificado emitido", fecha: "13/01/2022", visto: "112" }
];


const paginacionOpciones = {
    rowsPerPageText: 'Filas por Página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
}

class ListDocu extends Component {
    state = {
        busqueda: '',
        cuentas: [],
        columnas: []
    }

    onChange = async e => {
        e.persist();
        await this.setState({ busqueda: e.target.value });
        this.filtrarElementos();
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
        return (
            <>

                <Container className="margin-top">
                    <Navbar className="nav-css" collapseOnSelect expand="lg" bg="light" variant="light">
                        <h4 className="navTitle">Documentación</h4>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav" className="margin-navbar">
                            <Nav className="me-auto">
                                <div class="input-group">
                                    <input class="form-control border-end-0 border rounded-pill filterSearch"
                                        name="busqueda"
                                        placeholder="Buscador..."
                                        type="text"
                                        value={this.state.busqueda}
                                        onChange={this.onChange}
                                        id="example-search-input" />
                                    <span class="input-group-append">
                                        <button class="btn btn-outline-secondary  border-bottom-0 border rounded-pill ms-n5" type="button">
                                            <FontAwesomeIcon icon={faSearch} />
                                        </button>
                                    </span>
                                </div>
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
                    <Button className="uploadButton">Cargar nuevo documento</Button>
                </Container>
            </>
        );
    }
}
export default ListDocu;
