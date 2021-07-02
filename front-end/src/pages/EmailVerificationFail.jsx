import { useHistory } from "react-router-dom";

const EmailVerificationFail = () => {
    const history = useHistory();
    return (
        <div className="content-container">
            <h1>Failed..!</h1>

            <p>
                Something went wrong while verifying your email. Please try
                again later
            </p>

            <button onClick={() => history.push("/signup")}>
                Back to Signup
            </button>
        </div>
    );
};

export default EmailVerificationFail;
