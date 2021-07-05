import { forgotPassword } from './forgotPassword';
import { getGoogleOauthUrlRoute } from './getGoogleOAuthUrlRoute';
import { googleOauthCallbackRoute } from './googleOauthCallbackRoute';
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
    resetPassword,
    getGoogleOauthUrlRoute,
    googleOauthCallbackRoute
];
