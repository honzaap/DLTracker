import Achievement from "../Achievement/Achievement";
import "./Achievements.scss";

const Achievements = ({achievements}) => {
    const fullLength = achievements.length;
    achievements = achievements.filter(ac => ac.unlocktime === 0);
    const length = achievements.length

    return (
        <>
            <h2 className="text-red text-center">Achievements</h2>
            <p className="completed-count">Completed <span className="text-red">{fullLength - length}/{fullLength}</span></p>
            <div className="achievements-list">
            {achievements.map(achievement => (
                <Achievement key={achievement.name} achievement={achievement}></Achievement>
            ))}
            </div>
        </>
    )
};

export default Achievements;