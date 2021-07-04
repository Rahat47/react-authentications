import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import LoginPage from './pages/loginPage';
import SignUpPage from './pages/SignupPage';
import PrivateRoute from './auth/PrivateRoute';
import VerifyEmailPage from './pages/VerifyEmailPage';
import EmailVerificationLanding from './pages/EmailVerificationLanding';
import ForgotPassword from './pages/ForgotPassword';
import PasswordResetLanding from './pages/passwordResetLanding';
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

                <Route path={`/verify-email/:verificationString`}>
                    <EmailVerificationLanding />
                </Route>

                <Route path="/forgot-password">
                    <ForgotPassword />
                </Route>

                <Route path="/reset-password/:passwordResetCode">
                    <PasswordResetLanding />
                </Route>
            </Switch>
        </Router>
    );
}