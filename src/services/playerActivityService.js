import { DL2_ID } from "../services/constants";
import { fetchUserGames, fetchUserStats} from "../api/steamAPI";

export const getPlayerActivity = async () => {
    let playerActivity = {};
    let stats = await fetchUserStats();
    let games = await fetchUserGames();
    
    playerActivity.gameID = stats.gameid;
    playerActivity.gameName = stats.gameextrainfo;
    playerActivity.state = stats.personastate

    let dl2 = games.filter(g => g.appid === DL2_ID)[0];
    if(dl2){
        playerActivity.timePlayed = dl2.playtime_forever;
        playerActivity.last2Weeks = dl2.playtime_2weeks;
    }
    return playerActivity;
}