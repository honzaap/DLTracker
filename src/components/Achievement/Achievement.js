import "./Achievement.scss";

const Achievement = ({achievement}) => {
    return (
        <div className="achievement">
            <img className="bg" src={require("../../images/containers/achievement_container.png")}/>
            <div className="content">
                <div>
                    <img className="thumbnail" src={achievement.icongray}/>
                </div>
                <div>
                    <h5>{achievement.displayName}</h5>
                    {achievement.hidden === 1 ? "" : <p>{achievement.description}</p>}
                </div>
            </div>
        </div>
    )
};

export default Achievement;