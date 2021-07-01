import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useToken } from "../auth/useToken";
import axios from "axios";

const SignUpPage = () => {
    const [token, setToken] = useToken();

    const [errorMessage, setErrorMessage] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const history = useHistory();

    const onSignUpClicked = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/signup",
                {
                    email,
                    password,
                }
            );

            const { token } = response.data;
            setToken(token);
            history.push("/please-verify");
        } catch (error) {
            setErrorMessage(error.response.data);
            console.log(error);
        }
    };

    return (
        <div className="content-container">
            <h1>Sign Up</h1>
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
                placeholder="Password"
                name="password"
            />

            <input
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
            />

            <hr />

            <button
                disabled={!email || !password || password !== confirmPassword}
                onClick={onSignUpClicked}
            >
                Sign Up
            </button>
            <button onClick={() => history.push("/login")}>
                Already have an account? Log In
            </button>
        </div>
    );
};

export default SignUpPage;
