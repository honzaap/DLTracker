import Challenge from "../Challenge/Challenge";
import "./Challenges.scss";

const Challenges = ({challenges, onComplete, onRemove}) => {
    return (
        <>
            <h1 className="text-center">Challenges</h1>
            <div className="challenges-list">
                {challenges.map((cl,idx) => (
                    <Challenge key={cl.id} challenge={cl} onComplete={onComplete} onRemove={onRemove} type={idx%3+1}></Challenge>
                ))}
                {challenges.length === 0 ? "There are no challenges" : ""}
            </div>
        </>
    );
};

export default Challenges;