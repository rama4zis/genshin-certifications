// fetch api from https://akasha.cv/api/getRelevantProfiles/801725033
type Profile = {
    uid: string;
    nickname: string;
    level: number;
    worldLevel: number;
    finishedAchievements: number;
    stygianIndex?: number;
    stygianSeconds?: number;
    stygianId?: number;
    spiralAbyssFloor?: number;
    spiralAbyssFloorChamber?: number;
}

export async function fetchProfiles(uid: string): Promise<Profile> {
    try {
        const response = await fetch(`https://enka.network/api/uid/${uid}?info`);
        if (!response.ok) {
            throw new Error('Failed to fetch profiles');
        }
        const dataResponse = await response.json();
        const data: Profile = {
            uid: dataResponse.uid,
            nickname: dataResponse.playerInfo.nickname,
            level: dataResponse.playerInfo.level,
            worldLevel: dataResponse.playerInfo.worldLevel,
            finishedAchievements: dataResponse.playerInfo.finishAchievementNum,
            stygianIndex: dataResponse.playerInfo.stygianIndex,
            stygianSeconds: dataResponse.playerInfo.stygianSeconds,
            stygianId: dataResponse.playerInfo.stygianId,
            spiralAbyssFloor: dataResponse.playerInfo.towerFloorIndex,
            spiralAbyssFloorChamber: dataResponse.playerInfo.towerLevelIndex
        }
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch profiles');
    }

}
