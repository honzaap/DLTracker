import "./App.scss";
import { useState, useEffect } from "react";
import Challenges from "./components/Challenges/Challenges";
import AddChallenge from "./components/AddChallenge/AddChallenge";
import CompletedChallenges from "./components/CompletedChallenges/CompletedChallenges";
import Achievements from "./components/Achievements/Achievements";
import RecentAchievements from "./components/RecentAchievements/RecentAchievements";
import PlayerActivity from "./components/PlayerActivity/PlayerActivity";

function App() {
    const [challenges, setChallenges] = useState([]);
	const [achievements, setAchievements] = useState([
		{
			name: "ACH_1",
			displayName: "Flight of The Crane",
			description: "Lorem ipsum dolor sit amet",
			icongray: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/239140/7786b7c4c55a6f38c56f915726b156fdb78e738d.jpg",
		},
		{
			name: "ACH_2",
			hidden: 1,
			displayName: "Lorem ipsum",
			icongray: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/239140/7786b7c4c55a6f38c56f915726b156fdb78e738d.jpg",
		},
		{
			name: "ACH_3",
			description: "Lorem ipsum dolor sit amet",
			displayName: "Lorem dorem korem holem dolem",
			icongray: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/239140/7786b7c4c55a6f38c56f915726b156fdb78e738d.jpg",
		},
		{
			name: "ACH_4",
			hidden: 1,
			displayName: "Cock",
			icongray: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/239140/7786b7c4c55a6f38c56f915726b156fdb78e738d.jpg",
		},
		{
			name: "ACH_5",
			description: "Lorem ipsum dolor sit amet",
			displayName: "Flight of The Crane",
			icongray: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/239140/7786b7c4c55a6f38c56f915726b156fdb78e738d.jpg",
		},
		{
			name: "ACH_6",
			description: "Lorem ipsum dolor sit amet",
			displayName: "Flight of The Crane",
			icongray: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/239140/7786b7c4c55a6f38c56f915726b156fdb78e738d.jpg",
		},
		{
			name: "ACH_7",
			hidden: 1,
			displayName: "Flight of The Crane",
			icongray: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/239140/7786b7c4c55a6f38c56f915726b156fdb78e738d.jpg",
		},
	]);
	const [isActivityCompact, setIsActivityCompact] = useState(false);

	// Fetch achievements on load 
	useEffect(() => {
		const getAchievements = async () => {
			const achievements = await fetchAchievements();
			setAchievements(achievements);
		}

		//getAchievements();
	}, []);

	// Fetch achievements
	const fetchAchievements = async () => {
		const res = await fetch("https://jsonplaceholder.typicode.com/todos");
		const data = await res.json();

		return data;
	}

	// Set challenge as completed
	const completeChallenge = (id) => {
		setChallenges(challenges.map(cl => {
			if(cl.id === id){
				cl.completed = true;
				cl.timeCompleted = Date.now();
			}
			return cl
		}));
	}

	// Remove challenge from list 
	const removeChallenge = (id) => {
		setChallenges(challenges.filter(cl => cl.id !== id));
	}

	// Increase the progress of challenge by 1
	const incrementProgress = (id) => {
		setChallenges(challenges.map(cl => {
			if(cl.id === id) {
				cl.progress = Math.min(cl.progress+1, cl.value);
			}
			return cl;
		}));
	}

	// Add new challenge to list 
	const addChallenge = (challenge) => {
		challenge.id = challenges.length == 0 ? 0 : challenges[challenges.length - 1].id + 1;
		challenge.progress = 0;
		setChallenges(challenges.concat([challenge]));
	}

	// Return challenge from completed (set completed to false)
	const returnChallenge = (id) => {
		setChallenges(challenges.map(cl => {
			if(cl.id === id){
				cl.completed = false;
			}
			return cl
		}));
	}

	// Method that runs everytime the Add new challenge form is toggled
	const onToggleForm = (isFormHidden) => {
		setIsActivityCompact(!isFormHidden);
	}

	return (
		<>	
			<img className="bg-img bg-city" src={require('./images/background_city.jpg')} />
			<img className="bg-img bg-smoke" src={require('./images/smoke_cloud.png')} />
			<img className="bg-img bg-aiden" src={require('./images/aiden_transparent_bg.png')} />
			<div className="container-divide">
				<div className="challenges-container">
					<div>
						<Challenges challenges={challenges.filter(cl => cl.completed !== true)} onProgressIncrement={incrementProgress} onComplete={completeChallenge} onRemove={removeChallenge}></Challenges>
						<AddChallenge onToggleForm={onToggleForm} onAdd={addChallenge}></AddChallenge>
					</div>
					<div className="completed">
						<CompletedChallenges challenges={challenges.filter(cl => cl.completed === true)} onReturn={returnChallenge}></CompletedChallenges>
					</div>
				</div>
				<div className="achievements-container">
					<div className="achievements">
						<Achievements achievements={achievements}></Achievements>
					</div>
					<div className="recent">
						<RecentAchievements achievements={achievements}></RecentAchievements>
					</div>
				</div>
			</div>
			<div className="activity">
				<PlayerActivity isCompact={isActivityCompact}></PlayerActivity>
			</div>
		</>
	);
}

export default App;
