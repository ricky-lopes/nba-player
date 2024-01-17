import teams from "./teams.json"
import positions from "./positions.json"
import players from "./players.json"
import type { NBAData, Player, Position, Team } from "~/types/teams"

const mapperPlayer = (item: any) => ({
    firstName: item.firstName,
    lastName: item.lastName,
    image: item.img
}) as Player

export default (): NBAData => {
    return {
        teams: teams.map(item => ({
            value: item.acronym,
            name: item.name
        }) as Team),
        positions: positions.map(item => ({
            value: item.weight,
            name: item.name
        }) as Position),
        playersPivot: players.filter(item => item.position == "pivot").map(mapperPlayer),
        playersPointGuard: players.filter(item => item.position == "pivot").map(mapperPlayer)
    } as NBAData;
}