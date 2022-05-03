import { fetchGameAchievements, fetchPlayerAchievements} from "../api/steamAPI";

export const getAchievements = async () => {
    let achievements = await fetchGameAchievements();
    let playerAchievements = await fetchPlayerAchievements();

    playerAchievements = playerAchievements.map(pa => {
        let scheme = achievements.filter(a => a.apiname === pa.name)[0];
        if(scheme){
            pa.displayName = scheme.displayName;
            pa.description = scheme.description;
            pa.icongray = scheme.icongray;
        }
        return pa;
    })
    console.log(playerAchievements);
    return playerAchievements
}