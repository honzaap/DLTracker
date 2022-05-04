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

export const fetchPlayerAchievements = async (steamid) => {
    const functionName = "fetchPlayerAchievements";
    let url = `${API_URL}?function=${functionName}&steamid=${steamid}`;

    const res = await fetch(url);
    const data = await res.json();
    if(data.playerstats){
        if(data.playerstats.achievements){
            return data.playerstats.achievements;
        }
    }

    return [];
}

export const fetchUserStats = async (steamid) => {
    const functionName = "fetchUserStats";
    let url = `${API_URL}?function=${functionName}&steamid=${steamid}`;

    const res = await fetch(url);
    const data = await res.json();
    if(data.response){
        if(data.response.players[0]){
            return data.response.players[0];
        }
    }

    return {};
}

export const fetchUserGames = async (steamid) => {
    const functionName = "fetchUserGames";
    let url = `${API_URL}?function=${functionName}&steamid=${steamid}`;

    const res = await fetch(url);
    const data = await res.json();
    if(data.response){
        if(data.response.games){
            return data.response.games;
        }
    }

    return [];
}

export const fetchSteamidFromCustomUrl = async (urlUsername) => {
    const functionName = "fetchSteamidFromCustomUrl";
    let url = `${API_URL}?function=${functionName}&vanityurl=${urlUsername}`;

    const res = await fetch(url);
    const data = await res.json();
    
    return data.response.steamid;
}