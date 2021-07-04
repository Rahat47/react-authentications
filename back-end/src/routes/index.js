import { forgotPassword } from './forgotPassword';
import { loginRoute } from './loginRoute';
import { resetPassword } from './resetPassword';
import { signupRoute } from './signupRoute';
import { testEmailRoute } from './testEmailRoute';
import { testRoute } from './testRoute';
import { updateUserInfo } from './updateUserInfo';
import { verifyEmailRoute } from './verifyEmailRoute';

export const routes = [
    testRoute,
    signupRoute,
    loginRoute,
    updateUserInfo,
    verifyEmailRoute,
    forgotPassword,
    resetPassword
];
