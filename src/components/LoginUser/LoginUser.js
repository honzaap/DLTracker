import BtnDL from "../shared/BtnDL/BtnDL";
import InputGroup from "../shared/InputGroup/InputGroup";
import { fetchUserStats, fetchSteamidFromCustomUrl } from "../../api/steamAPI";
import { useState, useRef } from "react";
import "./LoginUser.scss";

const LoginUser = ({setUser = (steamid) => {}}) => {
    const [fetchedUser, setFetchedUser] = useState({});
    const [foundUser, setFoundUser] = useState();
    const [username, setUsername] = useState("");
    const [steamid, setSteamid] = useState(0);

    const usernameRef = useRef(null);

    const submitLogin = async (e) => {
        e.preventDefault();
        // Check whether custom url of id was provided
        let user = {};
        let steamid = 0;
        if(Number.parseInt(username)){
            user = await fetchUserStats(username);
            if(user.steamid == null){
                setFoundUser(false);
                return;
            }
            steamid = user.steamid;
        }
        else{
            steamid = await fetchSteamidFromCustomUrl(username);
            if(steamid == null){
                setFoundUser(false);
                return;
            }
            user = await fetchUserStats(steamid);
        }
        setFoundUser(true);
        setFetchedUser(user);
        setSteamid(steamid);
    }

    const confirmAccount = () => {
        setUser(steamid);
    }

    const cancelAccount = () => {
        setFoundUser(null);
        setFetchedUser({});
        setSteamid(0);
        usernameRef.current.resetValue();
    }

    return (
        <div className="login-container">
            <img className="bg-phone" src={require("../../images/bg_phone.png")} />
            <p>You need to have your achievements as public to track them!</p>
            <p>To track achievements, please enter your steam ID or your custom steam URL</p>
            <form className="login-form" onSubmit={submitLogin}>
                <InputGroup ref={usernameRef} id="loginUsername" dark={true} required={true} defaultValue="" onChange={(e) => { setUsername(e) }} label="" placeholder="Steam ID or custom URL"></InputGroup>
                <BtnDL dark={true} text="Submit"></BtnDL>
            </form>
            {foundUser === true && 
                <div className="login-result">
                    <div className="login-avatar">
                        <img src={fetchedUser.avatarfull}></img>
                        <h5>{fetchedUser.personaname}</h5>
                    </div>
                    <div className="login-confirm">
                        <p>Is this your profle?</p>
                        <button onClick={confirmAccount} className="confirm">Confirm</button>
                        <button onClick={cancelAccount} className="cancel">Cancel</button>
                    </div>
                </div>
            }
            {foundUser === false && 
                <p className="text-red">The user was not found.</p>
            }
        </div>
    )
};

export default LoginUser;