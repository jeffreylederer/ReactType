
export type LeagueType = {
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



export type UserType = {
    id: number,
    username: string,
    role: string
}

export function user(): UserType  {
    const UserType: UserType = JSON.parse(localStorage.getItem("login") as string);
    return UserType;
}

export function league(): LeagueType {
    const league: LeagueType = JSON.parse(localStorage.getItem("league") as string);
    return league;
}

export function IsLeagueNull():boolean {
    return localStorage.getItem("league") === null
}

export function IsUserNull(): boolean {
    return localStorage.getItem("login") === null
}

export function setUser( data: UserType): void
{
    localStorage.setItem('login', JSON.stringify(data));
}

export function setLeague( data: LeagueType ): void
{
    localStorage.setItem('league', JSON.stringify(data));
}

export function removeLeague(): void {
    localStorage.removeItem("league");
}

export function removeAll(): void {
    localStorage.clear();
}



