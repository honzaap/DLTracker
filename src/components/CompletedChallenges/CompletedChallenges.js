import "./CompletedChallenges.scss";
import CompletedChallenge from "../CompletedChallenge/CompletedChallenge";

const CompletedChallenges = ({challenges, onRemove}) => {
  return (
      <div>
        <h3>Completed challenges</h3>
        <div className="completed-challenges-list">
            {challenges.map((cl, idx) => (
                <CompletedChallenge key={cl.id} challenge={cl} onRemove={onRemove} type={idx%2+1}></CompletedChallenge>
            ))}
            {challenges.length === 0 ? "You haven't completed any challenges yet" : ""}
        </div>
      </div>
  );
};

export default CompletedChallenges;