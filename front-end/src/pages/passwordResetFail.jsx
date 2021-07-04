import { useHistory } from "react-router-dom";

const PasswordResetFail = () => {
    const history = useHistory();
    return (
        <div className="content-container">
            <h1>Failed..!</h1>

            <p>
                Something went wrong while updating your Password. Please try
                again later.
            </p>

            <button onClick={() => history.push("/forgot-password")}>
                Back to forgot password
            </button>
        </div>
    );
};

export default PasswordResetFail;
