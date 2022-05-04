import "./PlayerActivity.scss";
import { FaRegDotCircle, FaMinusCircle, FaUser } from "react-icons/fa";
import { useRef, useEffect } from "react";
import { DL2_ID } from "../../services/constants"

const PlayerActivity = ({isCompact, activity}) => {

    const userLabel = useRef(null);
    const timePlayedLabel = useRef(null);
    const last2WeeksLabel = useRef(null);

    useEffect(() => {
        // Shift by the width of the text
        userLabel.current.style.transform = `translateX(-${userLabel.current.getElementsByClassName("label")[0].clientWidth}px)`;
        timePlayedLabel.current.style.transform = `translateX(-${timePlayedLabel.current.getElementsByClassName("label")[0].clientWidth}px)`;
        last2WeeksLabel.current.style.transform = `translateX(-${last2WeeksLabel.current.getElementsByClassName("label")[0].clientWidth}px)`;
    })

    return (
        <div className="player-activity-container">
            <p className={!isCompact ? "show user" : "user"} ref={userLabel}>
                <span className="label">{activity.name}</span> 
                <span className="icon"><FaUser></FaUser></span>
            </p>
            
            {activity.gameid != null && activity.gameid.toString() === DL2_ID.toString()  && <p className="status active"><FaRegDotCircle></FaRegDotCircle> <span className={isCompact ? "hide" : ""}>Currently ingame</span></p>}
            {(activity.gameid != null && (activity.gameid != null && activity.gameid.toString() !== DL2_ID.toString())) && <p className="status active"><FaRegDotCircle></FaRegDotCircle> <span className={isCompact ? "hide" : ""}>{activity.gameName}</span></p>}
            {(activity.state === 1 && activity.gameid == null) && <p className="status online"><FaRegDotCircle></FaRegDotCircle> <span className={isCompact ? "hide" : ""}>Online</span></p>}
            {activity.state == 0 && <p className="status offline"><FaMinusCircle></FaMinusCircle>  <span className={isCompact ? "hide" : ""}>Offline</span></p>}

            <p className={!isCompact ? "show" : ""} ref={timePlayedLabel}><span className="label">Time played:</span> <span className="text-red">{activity.timePlayed == null ? 0 : Math.ceil(activity.timePlayed / 60)}h</span></p>
            <p className={!isCompact ? "show" : ""} ref={last2WeeksLabel}><span className="label">Last 2 weeeks:</span> <span className="text-red">{activity.last2Weeks == null ? 0 : Math.ceil(activity.last2Weeks / 60)}h</span></p>
        </div>
    )
}

export default PlayerActivity;