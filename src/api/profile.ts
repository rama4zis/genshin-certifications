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
        // Use the server-side API endpoint to avoid CORS issues
        const response = await fetch(`/api/profile/${uid}`);
        if (!response.ok) {
            throw new Error('Failed to fetch profiles');
        }
        const data: Profile = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch profiles');
    }

}
