import { FaTimes, FaCheck, FaEllipsisH, FaPlus } from "react-icons/fa"
import "./Challenge.scss";

const Challenge = ({challenge, onComplete, onRemove, type}) => {
    return (
        <div className="challenge">
            <img src={require(`../../images/containers/challenge_container_${type}.png`)}/>
            <div className="challenge-content">
                <h5>{challenge.title}</h5>
                <p>{challenge.description}</p>
                <div className="progress-bar">
                    <span>{challenge.progress}</span>
                    <div className="progress-container">
                        <div className="progress"></div>
                    </div>
                    <span>{challenge.value}</span>
                    <button className="btn-ico text-red"><FaPlus></FaPlus></button>
                </div>
                <div className="options">
                    <button className="btn-ico" onClick={onComplete}><FaCheck></FaCheck></button>
                    <button className="btn-ico"><FaEllipsisH></FaEllipsisH></button>
                </div>
            </div>
        </div>
    );
};

export default Challenge;