import { DL2_ID } from "../services/constants";
import { fetchUserGames, fetchUserStats} from "../api/steamAPI";

export const getPlayerActivity = async (steamid) => {
    let playerActivity = {};
    let stats = await fetchUserStats(steamid);
    let games = await fetchUserGames(steamid);
    
    playerActivity.gameid = stats.gameid; // can be null
    playerActivity.gameName = stats.gameextrainfo; // can be null
    playerActivity.state = stats.personastate // 1 or 0 (online/offline)
    playerActivity.name = stats.personaname

    let dl2 = games.filter(g => g.appid === DL2_ID)[0];
    if(dl2){
        playerActivity.timePlayed = dl2.playtime_forever;
        playerActivity.last2Weeks = dl2.playtime_2weeks;
    }
    return playerActivity;
}