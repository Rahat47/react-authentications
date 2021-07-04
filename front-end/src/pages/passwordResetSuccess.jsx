import { useHistory } from "react-router-dom";

const PasswordResetSuccess = () => {
    const history = useHistory();
    return (
        <div className="content-container">
            <h1>Success!</h1>

            <p>
                Your Password Has been updated successfully. Log in with your
                new password now.
            </p>

            <button onClick={() => history.push("/login")}>Login</button>
        </div>
    );
};

export default PasswordResetSuccess;
