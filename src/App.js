import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import { Navbar, Nav} from "react-bootstrap";
import Login from "./components/Login";
import About from "./components/About";
import Plan from "./components/Plan";
import Suport from "./components/Suport";
import Infor from "./components/Infor";
import MyMarks from "./components/student/MyMarks";
import MyClass from "./components/teacher/MyClass";
import Home from "./components/Home";
import Index from "./components/Index";
import TeachClassList from "./components/teacher/TeachClassList";
import TeachClass from "./components/teacher/TeachClass";
import InputMark from "./components/teacher/InputMark";
import { AuthContext } from "./context/AuthContext";
import { logoutAction, checkTokenAction } from "./actions/authAction";
import { DropdownStudent, DropdownTeacher } from "./components/DropdownUser";
import { PrivateRoute, PrivateRouteTeacher } from "./components/PrivateRoute";

export default function App() {
  const [userState, dispatch] = useContext(AuthContext);

  const AuthButton = () => {
    return userState.user !== "" ? (
      <>
        <span className="nav-link">
          <p className="auth-color">{userState.user.username}</p>
        </span>
        <NavLink
          to="/login"
          className="nav-link "
          onClick={() => {
            logoutAction(dispatch);
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

  const showDropdownUser = () => {
    if (userState.user !== "") {
      if (!userState.user.is_teacher) {
        return <DropdownStudent />;
      }
      if (userState.user.is_teacher) {
        return <DropdownTeacher />;
      }
    }
    return "";
  };

  useEffect(() => {
    checkTokenAction(dispatch);
  }, []);

  return (
    <Router>
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          className="navbar-color"
          // bg="info"
          variant="dark"
          // sticky="top"
          expand
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
              {showDropdownUser()}
              {/* <NavDropdown title="Hỗ trợ" id="collasible-nav-dropdown">
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
              </NavDropdown> */}
              <NavLink to="/about" className="nav-link">
                Giới thiệu
              </NavLink>
            </Nav>
            <Nav>{AuthButton()}</Nav>
          </Navbar.Collapse>
        </Navbar>

        <div>
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
            <PrivateRoute exact path="/infor" component={Infor} />
            <PrivateRoute exact path="/mymarks" component={MyMarks} />
            <PrivateRouteTeacher exact path="/myclass" component={MyClass} />
            <PrivateRouteTeacher
              exact
              path="/teachclasslist"
              component={TeachClassList}
            />
            <PrivateRouteTeacher exact path="/input" component={TeachClass} />
            <PrivateRouteTeacher
              exact
              path="/inputmark"
              component={InputMark}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
