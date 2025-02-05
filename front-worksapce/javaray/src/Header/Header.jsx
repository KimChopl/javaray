import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";

import { useNavigate } from "react-router-dom";
//import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

function CollapsibleExample() {
  const navi = useNavigate();

  const goTo = (path) => {
    navi(path);
  };

  /*
  const { auth, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };
  */

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={() => goTo("/")}>Javaray</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="바다" id="collapsible-nav-dropdown">
              <NavDropdown.Item onClick={() => goTo("/")}>
                선박예약
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => goTo("/")}>
                항구별 날씨
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="민물" id="collapsible-nav-dropdown">
              <NavDropdown.Item onClick={() => goTo("/")}>
                낚시터 조회
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => goTo("/")}>
                낚시터 신청
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => goTo("/")}>
                낚시 금지 구역
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => goTo("/")}>
                낚시 제한 구역
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={() => goTo("/")}>펀딩사이트</Nav.Link>
          </Nav>
          {
            /*auth.isAuthenticated*/ 1 ? (
              <Nav>
                <Nav.Link onClick={() => goTo("/")}>로그인</Nav.Link>
                <Nav.Link eventKey={2} onClick={() => goTo("/")}>
                  회원가입
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link onClick={() => goTo("/")}>로그아웃</Nav.Link>
                <Nav.Link eventKey={2} onClick={() => goTo("/")}>
                  마이페이지
                </Nav.Link>
              </Nav>
            )
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
