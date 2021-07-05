import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useToken } from "../auth/useToken";
import axios from "axios";
import { useQueryParams } from "../util/useQueryParams";
const LoginPage = () => {
    const [, setToken] = useToken();

    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [googleOauthUrl, setGoogleOauthUrl] = useState("");
    const history = useHistory();

    const { token: oauthToken } = useQueryParams();

    useEffect(() => {
        if (oauthToken) {
            setToken(oauthToken);
            history.push("/");
        }
    }, [oauthToken, setToken, history]);

    useEffect(() => {
        const loadOauthUrl = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:5000/auth/google/url"
                );
                setGoogleOauthUrl(data.url);
            } catch (error) {
                console.log(error);
            }
        };

        loadOauthUrl();
    }, []);

    const onLogInClicked = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/login",
                {
                    email,
                    password,
                }
            );

            const { token } = response.data;
            setToken(token);
            history.push("/");
        } catch (error) {
            setErrorMessage(error.response.data);
        }
    };

    return (
        <div className="content-container">
            <h1>Log In</h1>
            {errorMessage && <div className="fail"> {errorMessage} </div>}
            <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                placeholder="someone@email.com"
                name="email"
            />
            <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder="password"
                name="password"
            />
            <hr />
            <button disabled={!email || !password} onClick={onLogInClicked}>
                Log In
            </button>
            <button onClick={() => history.push("/forgot-password")}>
                Forgot your password?
            </button>
            <button onClick={() => history.push("/signup")}>
                Don't have an account? Sign Up
            </button>
            <button
                disabled={!googleOauthUrl}
                onClick={() => (window.location.href = googleOauthUrl)}
            >
                Log in with Google
            </button>
        </div>
    );
};

export default LoginPage;
