import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";

import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import SignIn from "../member/SignIn/SignIn";
import { AuthContext } from "../UseContext/Auth/AuthContext";
//import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

function CollapsibleExample() {
  const navi = useNavigate();
  const [isSignIn, setIsSignIn] = useState(false);
  const { auth, signout } = useContext(AuthContext);

  const signOutHandler = () => {
    signout();
  };

  const signInModal = (e) => {
    setIsSignIn(e);
  };

  const goTo = (path) => {
    navi(path);
  };

  return (
    <>
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
                <NavDropdown.Item onClick={() => goTo("/fishing")}>
                  낚시터 조회
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => goTo("/fishing/insert")}>
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
              <Nav.Link onClick={() => goTo("/funding")}>펀딩사이트</Nav.Link>
            </Nav>
            {auth.isAuthenticated ? (
              <Nav>
                <Nav.Link onClick={signOutHandler}>로그아웃</Nav.Link>
                <Nav.Link eventKey={2} onClick={() => goTo("/")}>
                  마이페이지
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link onClick={() => setIsSignIn(true)}>로그인</Nav.Link>
                <Nav.Link eventKey={2} onClick={() => goTo("/")}>
                  회원가입
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {isSignIn && <SignIn signinModal={signInModal} />}
    </>
  );
}

export default CollapsibleExample;
