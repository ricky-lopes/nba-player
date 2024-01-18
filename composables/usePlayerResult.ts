import type { User, UserPlayer } from "~/types/user";

const fixedPlayer = [
    {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3112335.png',
        label: 'Nikola Jokic',
        comments: 'WOWW!  vc é o maior da história da NBA!'
    },
    {
        image: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png',
        label: 'Luka Doncic',
        comments: 'Só visão e passes fora de série!'
    },
    {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4279888.png&w=350&h=254',
        label: 'Ja Morant',
        comments: 'Apanha muito em jogo, e é agressivo pós jogo e nas redes sociais, OLHA O TIROOO!'
    },
    {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6589.png&w=350&h=254',
        label: 'Draymond Greenn',
        comments: 'Por sua raiva ao jogar, cuidado, pode acabar machucando o amiguinho!'
    },
    {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4277956.png',
        label: 'Jordan Poole',
        comments: 'Piscininha amô! mas cuidado com o soco, por você apanhar bastante em jogos, suponhamos que seu jogador seja o Piscina!'
    }
] as UserPlayer[]

const fixedGabrielPlayer = [
    {
        image: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png',
        label: 'Luka Doncic',
        comments: 'Só visão e passes fora de série!'
    },
    {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3907497.png&w=350&h=254',
        label: 'Dejounte Murray',
        comments: ''
    },
    {
        image: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4433247.png&w=350&h=254',
        label: 'Jonathan Kuminga',
        comments: ''
    }
] as UserPlayer[]


export default () => {
    const nbaData = useNBAData()
    
    const gabrielVariants = ["Gabriel".toUpperCase(), "gab".toUpperCase()]
    const rickyVariants = ["Henrique".toUpperCase(), "Ricky".toUpperCase(), "Calvo".toUpperCase()]

    const playerResult = ref<UserPlayer>()

    const getPlayerResult = (user: User) => {
        if(user.name.toUpperCase().includes('GABRIEL' || 'GAB')) {
            playerResult.value = fixedGabrielPlayer[Math.floor(Math.random() * fixedGabrielPlayer.length)]
        } else if (rickyVariants.includes(user.name.toUpperCase())) {
            playerResult.value = fixedPlayer[1]
        } else if(user.angry && user.agression) {
            playerResult.value = fixedPlayer[2]
        } else if(user.angry) {
            playerResult.value = fixedPlayer[3]
        } else if(user.agression) {
            playerResult.value = fixedPlayer[4]
        } else {
            let player
            if(user.position == 1) {
                player = nbaData.playersPivot[Math.floor(Math.random() * nbaData.playersPivot.length)]
            } else {
                player = nbaData.playersPointGuard[Math.floor(Math.random() * nbaData.playersPointGuard.length)]
            }
    
            playerResult.value = {
                image: player.image,
                label: `${player.firstName} ${player.lastName}`,
                comments: ""
            }
        }

        return playerResult.value
    }

    return {
        getPlayerResult,
        playerResult
    }
}