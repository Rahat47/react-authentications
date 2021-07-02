import { useHistory } from "react-router-dom";

const EmailVerificationSuccess = () => {
    const history = useHistory();
    return (
        <div className="content-container">
            <h1>Success!</h1>

            <p>
                Thanks for verifying your email. Now you can enjoy all the
                features of this site
            </p>

            <button onClick={() => history.push("/")}>Go Home</button>
        </div>
    );
};

export default EmailVerificationSuccess;
