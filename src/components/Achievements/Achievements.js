import Achievement from "../Achievement/Achievement";
import "./Achievements.scss";

const Achievements = ({achievements}) => {
    return (
        <>
            <h2 className="text-red text-center">Achievements</h2>
            <p className="completed-count">Completed <span className="text-red">13/53</span></p>
            <div className="achievements-list">
            {achievements.map(achievement => (
                <Achievement key={achievement.name} achievement={achievement}></Achievement>
            ))}
            </div>
        </>
    )
};

export default Achievements;