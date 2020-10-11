import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
} from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

export function DropdownStudent() {
    return (
        <NavDropdown title="Cá nhân" id="collasible-nav-dropdown">
            <NavLink to="/infor" className="dropdown-item">
                Thông tin cá nhân
        </NavLink>
            <NavDropdown.Divider />
            <NavLink to="/mymarks" className="dropdown-item">
                Kết quả học tập
        </NavLink>
        </NavDropdown>
    )
}

export function DropdownTeacher() {
    return (
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
    )
}


