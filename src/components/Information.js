import React from "react";
import {
  Form,
  Button,
  Col,
  Row,
  ButtonToolbar,
  InputGroup,
  FormControl,
  ButtonGroup,
} from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
function Information() {
  return (
    <Router>
      <div>
        <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
          <ButtonGroup className="mr-2" aria-label="First group">
            <Link to="/plan" className="btn btn-secondary">
              1
            </Link>
            <Link to="/plan" className="btn btn-secondary">
              2
            </Link>
            <Link to="/plan" className="btn btn-secondary">
              3
            </Link>
            <Link to="/plan" className="btn btn-secondary">
              4
            </Link>
            <Link to="/plan" className="btn btn-secondary">
              5
            </Link>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    </Router>
  );
}

export default Information;
