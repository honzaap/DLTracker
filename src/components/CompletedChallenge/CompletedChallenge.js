import { FaQuestionCircle } from "react-icons/fa"
import BtnDL from "../shared/BtnDL/BtnDL";
import "./CompletedChallenge.scss";

const CompletedChallenge = ({challenge, onRemove, type}) => {
	return (
		<>
			<div className="completed-challenge">
				<img className="bg" src={require(`../../images/containers/completed_container_${type}.png`)} />
				<div className="content">
					<p>{challenge.title}</p>
					<p className="text-red">{challenge.value > 0 ? `${challenge.value}/${challenge.value}` : '1/1'}</p>
					<button className="btn-ico info"><FaQuestionCircle></FaQuestionCircle></button>
					<div className="menu-info">
						<p>{challenge.description}</p>
						<p>Completed on: <span className="text-red">10.04.2022{/*challenge.timeCompleted*/}</span></p>
						<BtnDL text="Return to challenges" dark={true}></BtnDL>
					</div>
				</div>
			</div>
			<div className="completed-challenge">
				<img className="bg" src={require(`../../images/containers/completed_container_${type}.png`)} />
				<div className="content">
					<p>{challenge.title}</p>
					<p className="text-red">{challenge.value > 0 ? `${challenge.value}/${challenge.value}` : '1/1'}</p>
					<button className="btn-ico info"><FaQuestionCircle></FaQuestionCircle></button>
					<div className="menu-info">
						<p>{challenge.description}</p>
						<p>Completed on: <span className="text-red">10.04.2022{/*challenge.timeCompleted*/}</span></p>
						<BtnDL text="Return to challenges" dark={true}></BtnDL>
					</div>
				</div>
			</div>
		</>
	);
};

export default CompletedChallenge;