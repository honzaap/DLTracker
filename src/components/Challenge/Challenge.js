import { FaTrashAlt, FaCheck, FaEllipsisH, FaPlus } from "react-icons/fa"
import "./Challenge.scss";

const Challenge = ({challenge, onComplete, onRemove, onProgressIncrement, type}) => {

    return (
        <div className="challenge">
            <img src={require(`../../images/containers/challenge_container_${type}.png`)}/>
            <div className="challenge-content">
                <h5>{challenge.title}</h5>
                <p>{challenge.description}</p>
                <div className={`progress-bar ${challenge.value <= 1 ? "hide" : ""}`}>
                    <span>{challenge.progress}</span>
                    <div className="progress-container">
                        <div style={{width: `${challenge.progress / challenge.value * 100}%`}} className="progress"></div>
                    </div>
                    <span>{challenge.value}</span>
                    <button onClick={() => {onProgressIncrement(challenge.id)}} className="btn-ico text-red"><FaPlus></FaPlus></button>
                </div>
                <div className="options">
                    <button className="btn-ico" onClick={() => {onComplete(challenge.id)}}><FaCheck></FaCheck></button>
                    <button className="btn-ico btn-menu"><FaEllipsisH></FaEllipsisH></button>
                    <div className="challenge-menu">
                        <button onClick={() => {onRemove(challenge.id)}} className="text-red"><FaTrashAlt></FaTrashAlt> Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Challenge;