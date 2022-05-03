import { API_URL } from "../services/constants";

export const fetchGameAchievements = async () => {
    const functionName = "fetchGameAchievements";
    let url = `${API_URL}?function=${functionName}`;

    const res = await fetch(url);
    const data = await res.json();
    if(data.game){
        if(data.game.availableGameStats.achievements){
            return data.game.availableGameStats.achievements;
        }
    }

    return [];
}

export const fetchPlayerAchievements = async () => {
    const functionName = "fetchPlayerAchievements";
    const userId = "76561198973679840"; // temporary
    let url = `${API_URL}?function=${functionName}&steamid=${userId}`;

    const res = await fetch(url);
    const data = await res.json();
    if(data.playerstats){
        if(data.playerstats.achievements){
            return data.playerstats.achievements;
        }
    }

    return [];
}

export const fetchUserStats = async () => {
    const functionName = "fetchUserStats";
    const userId = "76561198973679840"; // temporary
    let url = `${API_URL}?function=${functionName}&steamid=${userId}`;

    const res = await fetch(url);
    const data = await res.json();
    if(data.response){
        if(data.response.players[0]){
            return data.response.players[0];
        }
    }

    return {};
}

export const fetchUserGames = async () => {
    const functionName = "fetchUserGames";
    const userId = "76561198973679840"; // temporary
    let url = `${API_URL}?function=${functionName}&steamid=${userId}`;

    const res = await fetch(url);
    const data = await res.json();
    if(data.response){
        if(data.response.games){
            return data.response.games;
        }
    }

    return [];
}