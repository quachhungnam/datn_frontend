import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [userState] = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ props }) =>
        userState.user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
};
const PrivateRouteTeacher = ({ component: Component, ...rest }) => {
  const [userState] = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ props }) =>
        userState.user.is_teacher ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
};

export { PrivateRoute, PrivateRouteTeacher };
