export type Teams = {
    acronym: string,
    name: string    
}

export type Player = {
    firstName: string,
    lastName: string,
    image: string
}

export type Position = {
    weight: number,
    name: string
}

export type NBAData = {
    teams: Teams[],
    positions: Position[],
    players: Player[]
}