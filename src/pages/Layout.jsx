import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../CSS/layout.css";
import Header from "../components/Header";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const Layout = () => {
  return (
    <div className="layout vh-100">
     
      <Navbar variant="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/admin">
              Admin
            </Nav.Link>
            <Nav.Link as={Link} to="/home/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/home/experience">
              Experience
            </Nav.Link>
            <Nav.Link as={Link} to="/home/project">
              Project
            </Nav.Link>
            <Nav.Link as={Link} to="/home/course">
              Course
            </Nav.Link>
            <Nav.Link as={Link} to="/home/contact">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
       
      </Navbar>
      <Outlet />
     
    </div>
  );
};

export default Layout;

