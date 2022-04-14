import "./CompletedChallenges.scss";
import CompletedChallenge from "../CompletedChallenge/CompletedChallenge";

const CompletedChallenges = ({challenges, onReturn}) => {
  return (
      <div>
        <h3 className="completed-challenges-title">Completed challenges</h3>
        <div className="completed-challenges-list">
            {challenges.map((cl, idx) => (
                <CompletedChallenge key={cl.id} challenge={cl} onReturn={onReturn} type={idx%2+1}></CompletedChallenge>
            ))}
            <p className="text-center" hidden={challenges.length > 0}>You haven't completed any challenges yet</p>
        </div>
      </div>
  );
};

export default CompletedChallenges;