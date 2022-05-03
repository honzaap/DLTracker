import "./PlayerActivity.scss";
import { FaRegDotCircle, FaMinusCircle } from "react-icons/fa";
import { useRef, useEffect } from "react";

const PlayerActivity = ({isCompact}) => {

    const timePlayedLabel = useRef(null);
    const lastPlayedLabel = useRef(null);

    useEffect(() => {
        // Shift by the width of the text
        timePlayedLabel.current.style.transform = `translateX(-${timePlayedLabel.current.getElementsByClassName("label")[0].clientWidth}px)`;
        lastPlayedLabel.current.style.transform = `translateX(-${lastPlayedLabel.current.getElementsByClassName("label")[0].clientWidth}px)`;
    })

    return (
        <div className="player-activity-container">
            <p className="status active"><FaRegDotCircle></FaRegDotCircle> <span className={isCompact ? "hide" : ""}>Currently ingame</span></p>
            {/*<p className="status active"><FaRegDotCircle></FaRegDotCircle> <span className={isCompact ? "hide" : ""}>Currently playing: Dying Light</span></p>
            <p className="status online"><FaRegDotCircle></FaRegDotCircle> <span className={isCompact ? "hide" : ""}>Online</span></p>
            <p className="status offline"><FaMinusCircle></FaMinusCircle>  <span className={isCompact ? "hide" : ""}>Offline</span></p>*/}

            <p className={!isCompact ? "show" : ""} ref={timePlayedLabel}><span className="label">Time played:</span> <span className="text-red">15h</span></p>
            <p className={!isCompact ? "show" : ""} ref={lastPlayedLabel}><span className="label">Last 2 weeeks:</span> <span className="text-red">3h</span></p>
        </div>
    )
}

export default PlayerActivity;