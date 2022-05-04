import Achievement from "../Achievement/Achievement";
import BtnDL from "../shared/BtnDL/BtnDL";
import InputGroup from "../shared/InputGroup/InputGroup";
import { fetchUserStats, fetchSteamidFromCustomUrl } from "../../api/steamAPI";
import { useState, useRef } from "react";
import "./Achievements.scss";

const Achievements = ({achievements, loggedIn}) => {
    const [fetchedUser, setFetchedUser] = useState({});
    const [foundUser, setFoundUser] = useState();
    const [username, setUsername] = useState("");

    const fullLength = achievements.length;
    achievements = achievements.filter(ac => ac.unlocktime === 0);
    const length = achievements.length

    const usernameRef = useRef(null);

    const submitLogin = async (e) => {
        e.preventDefault();
        // Check whether custom url of id was provided
        let user = {};
        if(Number.parseInt(username)){
            user = await fetchUserStats(username);
            if(user.steamid == null){
                setFoundUser(false);
                return;
            }
        }
        else{
            const steamid = await fetchSteamidFromCustomUrl(username);
            if(steamid == null){
                setFoundUser(false);
                return;
            }
            user = await fetchUserStats(steamid);
        }
        setFoundUser(true);
        setFetchedUser(user);
    }

    return (
        <>
            <h2 className="text-red text-center">Achievements</h2>
            {loggedIn && 
                <>
                    <p className="completed-count">Completed <span className="text-red">{fullLength - length}/{fullLength}</span></p>
                    <div className="achievements-list">
                    {achievements.map(achievement => (
                        <Achievement key={achievement.apiname} achievement={achievement}></Achievement>
                    ))}
                    </div>
                </>            
            }
            {!loggedIn && 
                <div className="login-container">
                    <p>To track achievements, please enter your steam ID or your custom steam URL</p>
                    <form className="login-form" onSubmit={submitLogin}>
                        <InputGroup ref={usernameRef} id="loginUsername" dark={true} required={true} defaultValue="" onChange={(e) => { setUsername(e) }} label="" placeholder="Steam ID or custom URL"></InputGroup>
                        <BtnDL dark={true} text="Submit"></BtnDL>
                    </form>
                    {foundUser === true && 
                        <>
                            <div>
                                <img src={fetchedUser.avatarfull}></img>
                                <h5>{fetchedUser.personaname}</h5>
                            </div>
                            <p>Is this your profle?</p>
                            <div className="login-confirm">
                                <button className="confirm">Yes</button>
                                <button className="cancel">No</button>
                            </div>
                        </>
                    }
                    {foundUser === false && 
                        <p className="text-red">The user was not found.</p>
                    }
                </div>
            }
        </>
    )
};

export default Achievements;