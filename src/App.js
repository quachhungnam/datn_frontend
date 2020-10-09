import React, {
  useEffect,
  useState,
  useContext,
  useReducer,
  useMemo,
} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  Redirect,
} from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import Information from "./components/Information";
import Login from "./components/Login";
import About from "./components/About";
import Plan from "./components/Plan";
import Suport from "./components/Suport";
import Infor from "./components/Infor";
import MyMarks from "./components/student/MyMarks";
import TeachClass from "./components/teacher/TeachClass";
import MyClass from "./components/teacher/MyClass";
import Home from "./components/Home";
import Index from "./components/Index";
import AuthContext from "./context/AuthContext";
import { logout, login } from "./services/auth_service";
import { AuthContexts } from "./actions/auth";
export default function App() {
  const [state, dispatch] = useContext(AuthContexts);
  // const [local_store, set_local_store] = useState(user_store);
  // const [show]

  // const [state, dispatch] = useReducer(
  //   (prevState, action) => {
  //     switch (action.type) {
  //       case "RESTORE_TOKEN":
  //         return {
  //           ...prevState,
  //           accessToken: action.token,
  //           isLoading: false,
  //         };
  //       case "LOG_IN":
  //         return {
  //           ...prevState,
  //           isSignout: false,
  //           accessToken: action.token,
  //         };
  //       case "LOG_OUT":
  //         return {
  //           ...prevState,
  //           isSignout: true,
  //           accessToken: null,
  //         };
  //       default:
  //         break;
  //     }
  //   },
  //   {
  //     isLoading: true,
  //     isSignout: false,
  //     accessToken: null,
  //   }
  // );
  const action_login = async (user) => {
    try {
      const res = await login(user);
      if (res.access) {
        localStorage.setItem("user", JSON.stringify(res));
        dispatch({ type: "LOG_IN", token: res.access });
      } else {
        alert("Sai tai khoan hoac mat khau");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const action_logout = async () => {};
  useEffect(() => {
    check_token();
  }, []);

  const check_token = async () => {
    let user_token;
    try {
      user_token = await JSON.parse(localStorage.getItem("user"));
      if (user_token) {
        dispatch({ type: "RESTORE_TOKEN", token: user_token.access });
        // alert();
      } else {
        // user_token = null;
        await localStorage.removeItem("user");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // const authContext = useMemo(
  //   () => ({
  //     logIn: action_login,
  //     logOut: action_logout,
  //     accessToken: state.accessToken,
  //   }),
  //   [state.accessToken]
  // );

  const AuthButton = () => {
    return state.accessToken != null ? (
      <>
        <span className="nav-link">haahah</span>
        <NavLink
          to="/logout"
          className="nav-link"
          onClick={() => {
            logout();
            dispatch({ type: "LOG_OUT" });
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

  // const check_token

  const show_student = () => {
    return state.accessToken != null ? (
      <NavDropdown title="Cá nhân" id="collasible-nav-dropdown">
        <NavLink to="/infor" className="dropdown-item">
          Thông tin cá nhân
        </NavLink>
        <NavDropdown.Divider />
        <NavLink to="/mymarks" className="dropdown-item">
          Kết quả học tập
        </NavLink>
      </NavDropdown>
    ) : (
      ""
    );
  };

  const show_teacher = () => {
    return state.accessToken != null ? (
      <NavDropdown title="Cá nhân" id="collasible-nav-dropdown">
        <NavLink to="/infor" className="dropdown-item">
          Thông tin cá nhân
        </NavLink>
        <NavDropdown.Divider />
        <NavLink to="/myclass" className="dropdown-item">
          Lớp sinh hoạt
        </NavLink>
        <NavLink to="/teachclass" className="dropdown-item">
          Lớp giảng dạy
        </NavLink>
      </NavDropdown>
    ) : (
      ""
    );
  };

  return (
    // <AuthContext.Provider value={authContext}>
    <Router>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
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
            {show_student()}
            {show_teacher()}

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
          <Route exact path="/teachclass">
            <TeachClass />
          </Route>
        </Switch>
      </div>
    </Router>
    // </AuthContext.Provider>
  );
}

// function AuthButton() {
//   return (
//     <Link to="/login" className="nav-link">
//       Đăng nhập
//     </Link>
//   );
// }
