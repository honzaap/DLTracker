import { FaQuestionCircle } from "react-icons/fa"
import BtnDL from "../shared/BtnDL/BtnDL";
import "./CompletedChallenge.scss";

const CompletedChallenge = ({challenge, onReturn, type}) => {
	var date = new Date(challenge.timeCompleted );

	return (
		<div className="completed-challenge">
			<img className="bg" src={require(`../../images/containers/completed_container_${type}.png`)} />
			<div className="content">
				<p>{challenge.title}</p>
				<p className="text-red">{challenge.value > 0 ? `${challenge.progress}/${challenge.value}` : '1/1'}</p>
				<button className="btn-ico info"><FaQuestionCircle></FaQuestionCircle></button>
				<div className="menu-info">
					<p>{challenge.description}</p>
					<p>Completed on: <span className="text-red">{date.toLocaleDateString()}</span></p>
					<BtnDL onClick={() => {onReturn(challenge.id)}} text="Return to challenges" dark={true}></BtnDL>
				</div>
			</div>
		</div>
	);
};

export default CompletedChallenge;