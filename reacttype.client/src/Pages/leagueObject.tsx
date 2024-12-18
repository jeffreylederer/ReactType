import { useCookies } from 'react-cookie';

export type leagueType = {
    id: number;
    leagueName: string;
    active: boolean;
    teamSize: number;
    tiesAllowed: boolean;
    pointsCount: boolean;
    winPoints: number;
    tiePoints: number;
    byePoints: number;
    startWeek: number;
    pointsLimit: boolean;
    divisions: number;
    playOffs: boolean;
    players: unknown[];
    schedules: unknown[];
    teams: unknown[];
    userLeagues: unknown[];
};



export function ConvertLeague() {
    const cookie = useCookies(['league'])[0];
    return cookie.league;
}