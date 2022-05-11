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
import GithubCorner from "react-github-corner";
import useInterval from "./services/utils/useInterval";
import BG_IMG from "./images/background_city.jpg";
import BG_SMOKE from "./images/smoke_cloud.png";
import BG_AIDEN from "./images/aiden_transparent_bg.png";
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

	// On mount
	useEffect(async () => {
		localStorage.setItem(DEFAULT_CH_KEY, true);
	}, []);

	// Fetch new data every 15 seconds
	useInterval(async () => {
		if(steamid){
			setActivity(await getPlayerActivity(steamid));
			setAchievements(await getAchievements(steamid));
		}
	}, 15000);

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

	// Sets the steamid of user and save it to localStorage
	const setUser = (userSteamid) => {
		setSteamid(userSteamid);
		localStorage.setItem(STEAM_ID_KEY, userSteamid);
	}

	// Remove user and set achievements and stats to default
	const signOut = () => {
		setSteamid(null);
		setAchievements([]);
		setActivity({});
		localStorage.setItem(STEAM_ID_KEY, "");
	}

	// Call saveChallenges every time challenges property changes
	useEffect(() => {
		saveChallenges();
	}, [challenges])

	// Fetch new achievements and stats when steamid changes
	useEffect(async () => {
		if(steamid){
			setAchievements(await getAchievements(steamid));
			setActivity(await getPlayerActivity(steamid));
		}
	}, [steamid])

	return (
		<>	
			<img className="bg-img bg-city" src={BG_IMG} />
			<img className="bg-img bg-smoke" src={BG_SMOKE} />
			<img className="bg-img bg-aiden" src={BG_AIDEN} />
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
						<Achievements setUser={setUser} achievements={achievements} loggedIn={steamid != null && steamid != ""}></Achievements>
					</div>
					<div className="recent">
						<RecentAchievements achievements={achievements}></RecentAchievements>
					</div>
				</div>
			</div>
			<div className="activity">
				<PlayerActivity activity={activity} isCompact={isActivityCompact} signOut={signOut}></PlayerActivity>
			</div>
			<GithubCorner href="https://github.com/honzaap/dltracker"></GithubCorner>
		</>
	);
}

export default App;
