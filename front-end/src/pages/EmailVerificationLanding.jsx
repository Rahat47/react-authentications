import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";
import EmailVerificationFail from "./EmailVerificationFail";
import EmailVerificationSuccess from "./EmailVerificationSuccess";

const EmailVerificationLanding = () => {
    const [isLaoding, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const { verificationString } = useParams();
    const [, setToken] = useToken();

    useEffect(() => {
        const loadVerification = async () => {
            try {
                const response = await axios.put(
                    "http://localhost:5000/api/verify-email",
                    {
                        verificationString,
                    }
                );

                const { token } = response.data;
                setToken(token);
                setIsSuccess(true);
                setIsLoading(false);
            } catch (error) {
                setIsSuccess(false);
                setIsLoading(false);
            }
        };
        loadVerification();
    }, [setToken, verificationString]);

    if (isLaoding) return <p>Loading...</p>;

    if (!isSuccess) return <EmailVerificationFail />;

    return <EmailVerificationSuccess />;
};

export default EmailVerificationLanding;
