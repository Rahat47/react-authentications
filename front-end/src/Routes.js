import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import LoginPage from './pages/loginPage';
import SignUpPage from './pages/SignupPage';
export const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <UserInfoPage />
                </Route>

                <Route path="/login" exact>
                    <LoginPage />
                </Route>

                <Route path="/signup" exact>
                    <SignUpPage />
                </Route>
            </Switch>
        </Router>
    );
}