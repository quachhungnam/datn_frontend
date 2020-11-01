import React from 'react'
import {
    NavLink,
} from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

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
            <NavLink to="/teachclasslist" className="dropdown-item">
                Lớp giảng dạy
        </NavLink>
        </NavDropdown>
    )
}


