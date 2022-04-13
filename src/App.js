import "./App.scss";
import { useState, useEffect } from "react";
import Challenges from "./components/Challenges/Challenges";
import AddChallenge from "./components/AddChallenge/AddChallenge";
import CompletedChallenges from "./components/CompletedChallenges/CompletedChallenges";
import Achievements from "./components/Achievements/Achievements";
import RecentAchievements from "./components/RecentAchievements/RecentAchievements";
import PlayerActivity from "./components/PlayerActivity/PlayerActivity";

function App() {
    const [challenges, setChallenges] = useState(
        [
            {
                id: 1,
                title: "Kill zombies",
                description: "Kill zombies using any method",
				value: 10,
                progress: 0,
				completed: false,
                timeCompleted: null
            },
			{
                id: 2,
                title: "Behead zombies",
                description: "Behead zombies using sharp weapons",
				value: 5,
                progress: 0,
				completed: false,
                timeCompleted: null
            },
			{
                id: 3,
                title: "Kill zombies",
                description: "Kill zombies using any method",
				value: 7,
                progress: 0,
				completed: false,
                timeCompleted: null
            },
			{
                id: 4,
                title: "Massacre zombies",
                description: "Behead zombies using sharp weapons",
				value: 20,
                progress: 0,
				completed: false,
                timeCompleted: null
            },
			{
                id: 5,
                title: "Fuck up zombies",
                description: "Kill zombies using any method",
				value: 1,
                progress: 0,
				completed: false,
                timeCompleted: null
            },
			{
                id: 6,
                title: "Lorem ipsum dolor sit amet",
                description: "Lorem ispum dolor sit amet Lorem ispum dolor sit",
				value: 50,
                progress: 0,
				completed: false,
                timeCompleted: null
            }
        ]
    );
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
			}
			return cl
		}));
	}

	// Add new challenge to list 
	const addChallenge = (challenge) => {
		challenge.id = challenges.length == 0 ? 0 : challenges[challenges.length - 1].id + 1;
		setChallenges(challenges.concat([challenge]));
	}

	// Remove challenge from list 
	const removeChallenge = (id) => {
		setChallenges(challenges.filter(cl => cl.id !== id));
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
			{ /*
			<AddChallenge onAdd={addChallenge}></AddChallenge>
			*/ 
			}
			<div className="container-divide">
				<div className="challenges-container">
					<div>
						<Challenges challenges={challenges} onComplete={completeChallenge} onRemove={removeChallenge}></Challenges>
						<AddChallenge onToggleForm={onToggleForm}></AddChallenge>
					</div>
					<div className="completed">
						<CompletedChallenges challenges={challenges} onRemove={removeChallenge}></CompletedChallenges>
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
