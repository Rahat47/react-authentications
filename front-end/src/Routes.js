import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import LoginPage from './pages/loginPage';
import SignUpPage from './pages/SignupPage';
import PrivateRoute from './auth/PrivateRoute';
import VerifyEmailPage from './pages/VerifyEmailPage';
export const Routes = () => {
    return (
        <Router>
            <Switch>
                <PrivateRoute path="/" exact>
                    <UserInfoPage />
                </PrivateRoute>

                <Route path="/login" exact>
                    <LoginPage />
                </Route>

                <Route path="/signup" exact>
                    <SignUpPage />
                </Route>

                <PrivateRoute path="/please-verify" exact>
                    <VerifyEmailPage />
                </PrivateRoute>
            </Switch>
        </Router>
    );
}