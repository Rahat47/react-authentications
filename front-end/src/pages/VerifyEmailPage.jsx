import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const VerifyEmailPage = () => {
    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            history.push("/");
        }, 3000);
    }, [history]);

    return (
        <div className="content-container">
            <h1>Thanks for Signing Up.</h1>
            <p>
                A verification email has been sent to the email you signed up
                with. Please open click the verification link to verify your
                email to unlock full site features.
            </p>

            <p>Check Spam/Promotions if you can't find the Email</p>
        </div>
    );
};

export default VerifyEmailPage;
