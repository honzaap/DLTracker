import "./App.scss";
import { useState, useEffect } from "react";
import Challenges from "./components/Challenges/Challenges";
import AddChallenge from "./components/AddChallenge/AddChallenge";
import CompletedChallenges from "./components/CompletedChallenges/CompletedChallenges";
import Achievements from "./components/Achievements/Achievements";
import RecentAchievements from "./components/RecentAchievements/RecentAchievements";
import PlayerActivity from "./components/PlayerActivity/PlayerActivity";
import { getAchievements } from "./services/achievementService";
import { getPlayerActivity } from "./services/playerActivityService";
import { DEFAULT_CHALLENGES } from "./services/constants";

function App() {
	// Local storage keys
	const CHALLENGES_KEY = "DLTchallenges";
	const DEFAULT_CH_KEY = "DLTLoaded";
	const STEAM_ID_KEY = "DLTSteamID";

	let steamidLs = localStorage.getItem(STEAM_ID_KEY);
	let lsChallenges;
	try{
		lsChallenges = JSON.parse(localStorage.getItem(CHALLENGES_KEY));
	}
	catch{
		lsChallenges = [];
	}
	let defaultLoaded = localStorage.getItem(DEFAULT_CH_KEY);

    const [challenges, setChallenges] = useState(lsChallenges == null ? (defaultLoaded == null ? DEFAULT_CHALLENGES : []) : lsChallenges);
	const [achievements, setAchievements] = useState([]);
	const [isActivityCompact, setIsActivityCompact] = useState(false);
	const [steamid, setSteamid] = useState(steamidLs);
	
	// Player activity stats
	const [activity, setActivity] = useState({});

	// Get achievements and user stats on load 
	useEffect(async () => {
		// Init achievements and stas
		if(steamid != null){
			setActivity(await getPlayerActivity(steamid));
			setAchievements(await getAchievements(steamid));
		}
		// Shor pulling from API every 20s
		setInterval(async () => {
			if(steamid != null){
				setActivity(await getPlayerActivity());
				setAchievements(await getAchievements());
			}
		}, 20000);
		
		localStorage.setItem(DEFAULT_CH_KEY, true);
	}, []);
	

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

	// Runs when the Add new challenge form is toggled
	const onToggleForm = (isFormHidden) => {
		setIsActivityCompact(!isFormHidden);
	}

	// Save challenges to local storage
	const saveChallenges = () => {
		localStorage.setItem(CHALLENGES_KEY, JSON.stringify(challenges));
	}

	// Call saveChallenges every time challenges property changes
	useEffect(() => {
		saveChallenges();
	}, [challenges])

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
						<Achievements achievements={achievements} loggedIn={steamid != null}></Achievements>
					</div>
					<div className="recent">
						<RecentAchievements achievements={achievements}></RecentAchievements>
					</div>
				</div>
			</div>
			<div className="activity">
				<PlayerActivity activity={activity} isCompact={isActivityCompact}></PlayerActivity>
			</div>
		</>
	);
}

export default App;
