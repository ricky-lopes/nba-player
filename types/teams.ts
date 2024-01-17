export type Team = {
    value: string,
    name: string    
}

export type Player = {
    firstName: string,
    lastName: string,
    image: string
}

export type Position = {
    value: number,
    name: string
}

export type NBAData = {
    teams: Team[],
    positions: Position[],
    playersPivot: Player[],
    playersPointGuard: Player[]
}