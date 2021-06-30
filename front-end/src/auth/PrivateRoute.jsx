import { Redirect, Route } from "react-router-dom";

const PrivateRoute = props => {
    const user = null;
    if (!user) return <Redirect to="/login" />;

    return <Route {...props} />;
};

export default PrivateRoute;
