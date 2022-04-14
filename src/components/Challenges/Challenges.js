import Challenge from "../Challenge/Challenge";
import "./Challenges.scss";

const Challenges = ({challenges, onComplete, onRemove, onProgressIncrement}) => {
    return (
        <>
            <h1 className="text-center">Challenges</h1>
            <div className="challenges-list">
                {challenges.map((cl,idx) => (
                    <Challenge key={cl.id} challenge={cl} onProgressIncrement={onProgressIncrement} onComplete={onComplete} onRemove={onRemove} type={idx%3+1}></Challenge>
                ))}
                <p className="text-center" hidden={challenges.length > 0}>There are no challenges</p>
            </div>
        </>
    );
};

export default Challenges;