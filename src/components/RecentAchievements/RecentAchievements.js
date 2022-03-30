import "./RecentAchievements.scss";

const RecentAchievements = ({achievements}) => {
    return (
        <div>
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
        </div>
    );
};

export default RecentAchievements;