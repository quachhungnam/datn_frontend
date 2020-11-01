import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Login from "./components/Login";
import About from "./components/About";
import Plan from "./components/Plan";
import Suport from "./components/Suport";
import Infor from "./components/Infor";
import MyMarks from "./components/student/MyMarks";
// import TeachClass from "./components/teacher/TeachClassList";
import MyClass from "./components/teacher/MyClass";
import Home from "./components/Home";
import Index from "./components/Index";
import { AuthContext } from "./context/AuthContext";
import { logout_action, checktoken_action } from "./actions/auth_action";
import { DropdownStudent, DropdownTeacher } from "./components/DropdownUser";
import TeachClassList from "./components/teacher/TeachClassList";
import TeachClass from "./components/teacher/TeachClass";
import InputMark from "./components/teacher/InputMark";

export default function App() {
  const [userState, dispatch] = useContext(AuthContext);

  useEffect(() => {
    checktoken_action(dispatch);
  }, []);

  const AuthButton = () => {
    return userState.user !== "" ? (
      <>
        <span className="nav-link">{userState.user.username}</span>
        <NavLink
          to="/login"
          className="nav-link"
          onClick={() => {
            logout_action(dispatch);
          }}
        >
          Đăng xuất
        </NavLink>
      </>
    ) : (
      <NavLink to="/login" className="nav-link">
        Đăng nhập
      </NavLink>
    );
  };

  const show_dropdown_user = () => {
    if (userState.user !== "") {
      if (!userState.user.is_teacher) {
        return <DropdownStudent></DropdownStudent>;
      } else {
        return <DropdownTeacher></DropdownTeacher>;
      }
    }
    return "";
  };

  return (
    <Router>
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          className=".bg-info"
          sticky="top"
        >
          <Navbar.Brand href="/">THPT Trần Quang Diệu</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavLink to="/home" className="nav-link">
                Trang chủ
              </NavLink>
              <NavLink to="/plan" className="nav-link">
                Kế hoạch
              </NavLink>
              {show_dropdown_user()}
              <NavDropdown title="Hỗ trợ" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Sử dụng tài khoản
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Văn bản quy định
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Hỗ trợ trực tuyến
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Biểu mẫu thường dùng
                </NavDropdown.Item>
              </NavDropdown>
              <NavLink to="/about" className="nav-link">
                Giới thiệu
              </NavLink>
            </Nav>
            <Nav>
              {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
              {AuthButton()}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              <Index />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/plan">
              <Plan />
            </Route>
            <Route exact path="/suport">
              <Suport />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/infor">
              <Infor />
            </Route>
            <Route exact path="/mymarks">
              <MyMarks />
            </Route>
            <Route exact path="/myclass">
              <MyClass />
            </Route>
            <Route exact path="/teachclasslist">
              <TeachClassList />
            </Route>
            <Route exact path="/input">
              <TeachClass />
            </Route>
            <Route exact path="/inputmark">
              <InputMark />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
