import { json, type RequestHandler } from '@sveltejs/kit';

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
};

export const GET: RequestHandler = async ({ params }) => {
	const { uid } = params;

	try {
		const response = await fetch(`https://enka.network/api/uid/${uid}?info`);
		
		if (!response.ok) {
			return json(
				{ error: 'Failed to fetch profile from Enka Network' },
				{ status: response.status }
			);
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
		};

		return json(data);
	} catch (error) {
		console.error('Error fetching profile:', error);
		return json(
			{ error: 'Failed to fetch profile' },
			{ status: 500 }
		);
	}
};
