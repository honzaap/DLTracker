import "./RecentAchievements.scss";

const RecentAchievements = ({achievements}) => {
    achievements = achievements.filter(ac => ac.achieved === 1);
    achievements.sort((a, b) => b.unlocktime - a.unlocktime);
    return (
        <>
            <h4 className="text-black recent-title">Recently Completed</h4>
            <div className="recent-list-container">
                <div className="recent-list">
                    {achievements.slice(0, 4).map(achievement => (
                        <div key={achievement.name}>
                            {achievement.displayName}
                        </div>
                    ))}
                </div>
                <img className="mask" src={require("../../images/containers/recent_achievements_mask.png")} />
            </div>
        </>
    );
};

export default RecentAchievements;