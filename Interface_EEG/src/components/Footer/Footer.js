
import React from "react";

// reactstrap components
import { Container, Nav, NavItem, NavLink } from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <Nav>
          <NavItem>
            <NavLink href="">
              Marsh Internship
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href=" ">
              About Us
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href=" ">
              Blog
            </NavLink>
          </NavItem>
        </Nav>
        <div className="copyright">
          © {new Date().getFullYear()}  {" "}
          <i className="tim-icons icon-heart-2" />  {" "}
          <a
            href=" "
            target="_blank"
          >

          </a>{" "}
          for a better Vusialisation.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
