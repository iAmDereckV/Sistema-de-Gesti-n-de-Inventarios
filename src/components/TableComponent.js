import React, { useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";

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
          { id: Date.now(), ...newItem }, // Usamos Date.now() para evitar colisiones de ID
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

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este elemento?")) {
      setData({
        ...data,
        [dataKey]: data[dataKey].filter((item) => item.id !== id),
      });
    }
  };

  return (
    <Container fluid>
      <h2 className="mt-3">{title}</h2>
      <Table striped bordered hover responsive>
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
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(item)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button
        variant="info"
        className="mb-3"
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

export default TableComponent;
