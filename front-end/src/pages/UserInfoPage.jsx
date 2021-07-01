import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";
export const UserInfoPage = () => {
    const [token, setToken] = useToken();
    const user = useUser();

    const { id, email, info, isVerified } = user;
    const history = useHistory();

    // These states are bound to the values of the text inputs
    // on the page (see JSX below).
    const [favouriteFood, setFavouriteFood] = useState(
        info.favouriteFood || ""
    );
    const [hairColor, setHairColor] = useState(info.hairColor || "");
    const [bio, setBio] = useState(info.bio || "");

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    useEffect(() => {
        if (showSuccessMessage || showErrorMessage) {
            setTimeout(() => {
                setShowSuccessMessage(false);
                setShowErrorMessage(false);
            }, 3000);
        }
    }, [showSuccessMessage, showErrorMessage]);

    const saveChanges = async () => {
        try {
            const response = await axios.patch(
                `http://localhost:5000/api/users/${id}`,
                {
                    favouriteFood,
                    hairColor,
                    bio,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const newToken = response.data.token;
            setToken(newToken);

            setShowSuccessMessage(true);
        } catch (error) {
            setShowErrorMessage(true);
            console.log(error.response.data);
        }
    };

    const logOut = () => {
        localStorage.removeItem("token");
        history.push("/login");
    };

    const resetValues = () => {
        setFavouriteFood(info.favouriteFood);
        setHairColor(info.hairColor);
        setBio(info.bio);
    };

    return (
        <div className="content-container">
            <h1>Info for {email}</h1>
            {!isVerified && (
                <div className="fail">
                    You need to verify your email before you can make changes
                </div>
            )}
            {showSuccessMessage && (
                <div className="success">Successfully saved user data!</div>
            )}
            {showErrorMessage && (
                <div className="fail">
                    Uh oh... something went wrong and we couldn't save changes
                </div>
            )}
            <label>
                Favourite Food:
                <input
                    onChange={e => setFavouriteFood(e.target.value)}
                    value={favouriteFood}
                />
            </label>
            <label>
                Hair Color:
                <input
                    onChange={e => setHairColor(e.target.value)}
                    value={hairColor}
                />
            </label>
            <label>
                Bio:
                <input onChange={e => setBio(e.target.value)} value={bio} />
            </label>
            <hr />
            <button disabled={!isVerified} onClick={saveChanges}>
                Save Changes
            </button>
            <button onClick={resetValues}>Reset Values</button>
            <button onClick={logOut}>Log Out</button>
        </div>
    );
};
