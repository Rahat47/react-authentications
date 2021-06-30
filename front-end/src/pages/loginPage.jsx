import { useState } from "react";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const onLogInClicked = async () => {
        alert("Login not implemented yet");
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
        </div>
    );
};

export default LoginPage;
