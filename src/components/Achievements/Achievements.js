import Achievement from "../Achievement/Achievement";
import LoginUser from "../LoginUser/LoginUser";
import "./Achievements.scss";

const Achievements = ({achievements, loggedIn, setUser = (steamid) => {}}) => {
    const fullLength = achievements.length;
    achievements = achievements.filter(ac => ac.unlocktime === 0);
    const length = achievements.length

    return (
        <>
            <h2 className="text-red text-center">Achievements</h2>
            {loggedIn && 
                <>
                    <p className="completed-count">Completed <span className="text-red">{fullLength - length}/{fullLength}</span></p>
                    <div className="achievements-list">
                    {achievements.map(achievement => (
                        <Achievement key={achievement.apiname} achievement={achievement}></Achievement>
                    ))}
                    </div>
                </>            
            }
            {!loggedIn && 
                <LoginUser setUser={setUser}></LoginUser>
            }
        </>
    )
};

export default Achievements;