import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PasswordResetFail from "./passwordResetFail";
import PasswordResetSuccess from "./passwordResetSuccess";

const PasswordResetLanding = () => {
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { passwordResetCode } = useParams();

    const onResetClick = async () => {
        try {
            await axios.put(
                `http://localhost:5000/api/users/${passwordResetCode}/reset-password`,
                { newPassword: password }
            );
            setSuccess(true);
        } catch (error) {
            console.log(error.message);
            setFailure(true);
        }
    };

    if (success) return <PasswordResetSuccess />;

    if (failure) return <PasswordResetFail />;

    return (
        <div className="content-container">
            <h1>Reset Password</h1>
            <p>Please enter e new Password</p>
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
            />
            <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
            />

            <button
                disabled={
                    !password ||
                    !confirmPassword ||
                    password !== confirmPassword
                }
                onClick={onResetClick}
            >
                Reset Password
            </button>
        </div>
    );
};

export default PasswordResetLanding;
