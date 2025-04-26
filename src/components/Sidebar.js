import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import initialData from "../data/initialData";

const Sidebar = () => (
  <>
    <h4>Menú</h4>
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
  </>
);

export default Sidebar;
