import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Row, Col, Nav, Table, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const initialData = {
  productos: [
    {
      id: 1,
      nombre: "Producto A",
      categoria: "Electrónicos",
      stock: 10,
      precio: 150.0,
    },
    { id: 2, nombre: "Producto B", categoria: "Ropa", stock: 5, precio: 50.0 },
  ],
  categorias: [
    { id: 1, nombre: "Electrónicos" },
    { id: 2, nombre: "Ropa" },
  ],
  proveedores: [
    {
      id: 1,
      nombre: "Proveedor X",
      telefono: "12345678",
      email: "provx@mail.com",
    },
  ],
  compras: [
    { id: 1, proveedor: "Proveedor X", total: 200.0, fecha: "2024-04-02" },
  ],
  ventas: [{ id: 1, usuario: "Usuario 1", total: 100.0, fecha: "2024-04-02" }],
  movimientos_inventario: [
    {
      id: 1,
      producto: "Producto A",
      tipo: "ingreso",
      cantidad: 5,
      fecha: "2024-04-02",
    },
  ],
  cajas: [
    {
      id: 1,
      usuario: "Usuario 1",
      monto_apertura: 500.0,
      monto_cierre: 450.0,
      fecha: "2024-04-02",
    },
  ],
};

const TableComponent = ({ title, dataKey, data, setData }) => {
  const [newItem, setNewItem] = useState({});
  const [editItem, setEditItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (Object.keys(newItem).length === 0) return;
    if (editItem) {
      setData({
        ...data,
        [dataKey]: data[dataKey].map((item) =>
          item.id === editItem.id ? { ...editItem, ...newItem } : item
        ),
      });
      setEditItem(null);
    } else {
      setData({
        ...data,
        [dataKey]: [
          ...data[dataKey],
          { id: data[dataKey].length + 1, ...newItem },
        ],
      });
    }
    setNewItem({});
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setNewItem(item);
    setShowForm(true);
  };

  return (
    <Container fluid>
      <h2 className="mt-3">{title}</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            {Object.keys(data[dataKey][0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data[dataKey].map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
              <td>
                <Button variant="warning" onClick={() => handleEdit(item)}>
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
        variant="info"
        className="mb-2"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Ocultar Formulario" : "Mostrar Formulario"}
      </Button>
      {showForm && (
        <Form>
          {Object.keys(data[dataKey][0]).map(
            (key) =>
              key !== "id" && (
                <Form.Group key={key} className="mb-2">
                  <Form.Control
                    type="text"
                    name={key}
                    placeholder={key}
                    value={newItem[key] || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              )
          )}
          <Button variant="primary" onClick={handleAdd}>
            {editItem ? "Actualizar" : "Agregar"}
          </Button>
        </Form>
      )}
    </Container>
  );
};

const DashboardLayout = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Col md={2} className="bg-light vh-100 p-3">
          <h4>Inventario</h4>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            {Object.keys(initialData).map((key) => (
              <Nav.Link key={key} as={Link} to={`/${key}`}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Nav.Link>
            ))}
          </Nav>
        </Col>
        <Col md={10} className="p-4">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

const Home = () => (
  <div>
    <h1>Bienvenido al Sistema de Inventario</h1>
    <p>Selecciona una opción del menú para comenzar.</p>
  </div>
);

const App = () => {
  const [data, setData] = useState(initialData);

  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          {Object.keys(data).map((key) => (
            <Route
              key={key}
              path={`/${key}`}
              element={
                <TableComponent
                  title={key.charAt(0).toUpperCase() + key.slice(1)}
                  dataKey={key}
                  data={data}
                  setData={setData}
                />
              }
            />
          ))}
        </Routes>
      </DashboardLayout>
    </Router>
  );
};

export default App;
