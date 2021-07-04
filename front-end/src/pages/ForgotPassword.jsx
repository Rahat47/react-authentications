import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const ForgotPassword = () => {
    const [emailVal, setEmailVal] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const onSubmitClick = async () => {
        try {
            await axios.put(
                `http://localhost:5000/api/forgot-password/${emailVal}`
            );
            setSuccess(true);
            setTimeout(() => {
                history.push("/login");
            }, 3000);
        } catch (error) {
            setSuccess(false);
            setErrorMessage(error.message);
        }
    };

    const history = useHistory();
    return success ? (
        <div className="content-container">
            <h1>Success!</h1>
            <p>Please check your email for a Reset link</p>
        </div>
    ) : (
        <div className="content-container">
            <h1>Forgot Password</h1>
            <p>Enter your email and we'll send you a password reset link</p>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <input
                type="text"
                name="email"
                id="email"
                value={emailVal}
                onChange={e => setEmailVal(e.target.value)}
                placeholder="someone@email.com"
            />

            <button disabled={!emailVal} onClick={onSubmitClick}>
                Send
            </button>
        </div>
    );
};

export default ForgotPassword;
