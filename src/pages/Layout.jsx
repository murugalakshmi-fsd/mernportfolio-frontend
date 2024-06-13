import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../CSS/layout.css";
import Header from "../components/Header";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const Layout = () => {
  return (
    <div className="layout vh-100">
      <div className="head">
        <Header/>
        </div>
      <Navbar variant="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/experience">
              Experience
            </Nav.Link>
            <Nav.Link as={Link} to="/project">
              Project
            </Nav.Link>
            <Nav.Link as={Link} to="/course">
              Course
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav className="ml-auto">
          <NavDropdown title="Admin" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/admin-login">
              Login
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/admin-register">
              Signup
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
      <Outlet />
     
    </div>
  );
};

export default Layout;

