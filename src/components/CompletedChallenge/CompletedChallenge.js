import { FaQuestionCircle } from "react-icons/fa"
import "./CompletedChallenge.scss";

const CompletedChallenge = ({challenge, onRemove, type}) => {
	return (
		<>
			<div className="completed-challenge">
				<img className="bg" src={require(`../../images/containers/completed_container_${type}.png`)} />
				<div className="content">
					<p>{challenge.title}</p>
					<p className="text-red">{challenge.value > 0 ? `${challenge.value}/${challenge.value}` : '1/1'}</p>
					<FaQuestionCircle className="btn-ico info"></FaQuestionCircle>
				</div>
			</div>
			<div className="completed-challenge">
				<img className="bg" src={require(`../../images/containers/completed_container_${type}.png`)} />
				<div className="content">
					<p>{challenge.title}</p>
					<p className="text-red">{challenge.value > 0 ? `${challenge.value}/${challenge.value}` : '1/1'}</p>
					<FaQuestionCircle className="btn-ico info"></FaQuestionCircle>
				</div>
			</div>
		</>
	);
};

export default CompletedChallenge;