import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Col md={2} className="bg-light vh-100 p-3">
          <Sidebar />
        </Col>
        <Col md={10} className="p-4">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardLayout;
