<template>
  <div class="w-full h-screen p-8 bg-cover bg-[url('/assets/wallpaper-nba.jpg')]">
    <h1 class="font-bold">Qual Jogador de Basquete é você?</h1>
    <UForm :validate="validate" :state="state" class="space-y-4 mt-8" @submit="onSubmit">
      <UFormGroup label="Nome" name="name">
        <UInput color="cyan" v-model="state.name" />
      </UFormGroup>

      <UFormGroup label="Idade" name="age">
        <UInput color="cyan" v-model="state.age" type="number" />
      </UFormGroup>

      <UFormGroup label="Pricipal Característica" name="feature">
        <UInput color="cyan" v-model="state.feature" />
      </UFormGroup>

      <UFormGroup label="Se você fosse draftado por um time na NBA, qual seria?" name="team">
        <USelect color="cyan" v-model="state.team" :options="teams" option-attribute="name"/>
      </UFormGroup>

      <UFormGroup label="Qual sua posição?" name="team">
        <USelect color="cyan" v-model="state.position" :options="position" option-attribute="name"/>
      </UFormGroup>

      
      <UFormGroup label="Você se estressa jogando basquete?" name="angry">
        <UToggle
          on-icon="i-heroicons-check-20-solid"
          off-icon="i-heroicons-x-mark-20-solid"
          color="blue"
          v-model="state.angry"
        />
      </UFormGroup>

      <UFormGroup label="Costuma apanhar muito em jogos?" name="agression">
        <UToggle
          on-icon="i-heroicons-check-20-solid"
          off-icon="i-heroicons-x-mark-20-solid"
          color="blue"
          v-model="state.agression"
        />
      </UFormGroup>
      
      <div class="flex gap-3 w-full justify-center">
        <UButton type="submit" @click="isOpen = state.name && state.age && state.feature && state.position && state.team ? true : false" color="blue" variant="soft" size="xl">
          Pesquisar
        </UButton>
      </div>
      
    </UForm>
    
  </div>

  <UModal v-model="isOpen">
    <div class="p-4" v-if="isOpen">
      <div class="w-full flex justify-between">
        <h1 class="font-bold">Seu jogador é:</h1>
        <UIcon @click="isOpen = false" name="i-heroicons-x-mark" />
        
      </div>
      <div class="flex justify-center mt-8 rounded-t-3xl">
        <NuxtImg
          :src="getImage()"
        />
      </div>
      <div class="mt-8">
        <h2>
          {{getResult()}}
        </h2>
      </div>
    </div>
    
  </UModal>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const teams = [
  {
    "value": "ATL",
    "name": "Atlanta Hawks",
  },
  {
    "value": "BOS",
    "name": "Boston Celtics",
  },
  {
    "value": "BKN",
    "name": "Brooklyn Nets",
  },
  {
    "value": "CHA",
    "name": "Charlotte Hornets",
  },
  {
    "value": "CHI",
    "name": "Chicago Bulls",
  },
  {
    "value": "CLE",
    "name": "Cleveland Cavaliers",
  },
  {
    "value": "DAL",
    "name": "Dallas Mavericks",
  },
  {
    "value": "DEN",
    "name": "Denver Nuggets",
  },
  {
    "value": "DET",
    "name": "Detroit Pistons",
  },
  {
    "value": "GSW",
    "name": "Golden State Warriors",
  },
  {
    "value": "HOU",
    "name": "Houston Rockets",
  },
  {
    "value": "IND",
    "name": "Indiana Pacers",
  },
  {
    "value": "LAC",
    "name": "Los Angeles Clippers",
  },
  {
    "value": "LAL",
    "name": "Los Angeles Lakers"
  },
  {
    "value": "MEM",
    "name": "Memphis Grizzlies",
  },
  {
    "value": "MIA",
    "name": "Miami Heat",
  },
  {
    "value": "MIL",
    "name": "Milwaukee Bucks",
  },
  {
    "value": "MIN",
    "name": "Minnesota Timberwolves",
  },
  {
    "value": "NOP",
    "name": "New Orleans Pelicans",
  },
  {
    "value": "NYK",
    "name": "New York Knicks",
  },
  {
    "value": "OKC",
    "name": "Oklahoma City Thunder",
  },
  {
    "value": "ORL",
    "name": "Orlando Magic",
  },
  {
    "value": "PHI",
    "name": "Philadelphia 76ers",
  },
  {
    "value": "PHX",
    "name": "Phoenix Suns",
  },
  {
    "value": "POR",
    "name": "Portland Trail Blazers",
  },
  {
    "value": "SAC",
    "name": "Sacramento Kings",
  },
  {
    "value": "SAS",
    "name": "San Antonio Spurs",
  },
  {
    "value": "TOR",
    "name": "Toronto Raptors",
  },
  {
    "value": "UTA",
    "name": "Utah Jazz",
  },
  {
    "value": "WAS",
    "name": "Washington Wizards",
  }
]

const position = [
  {
    "value": 1,
    "name": "Pivô",
  },
  {
    "value": 1,
    "name": "Ala-Pivô",
  },
  {
    "value": 2,
    "name": "Armador",
  },
  {
    "value": 2,
    "name": "Ala-Armador",
  },
]

const playersPivo = [
  {
    "firstName": "Giannis",
    "lastName": "Antetokounmpo",
    "img": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3032977.png",
  },
  {
    "firstName": "Jimmy",
    "lastName": "Butler",
    "img": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6430.png"
  },
  {
    "firstName": "Anthony",
    "lastName": "Davis",
    "img": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6583.png"
  },
  {
    "firstName": "Kevin",
    "lastName": "Durant",
    "img": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3202.png"
  },
  {
    "firstName": "Joel",
    "lastName": "Embiid",
    "img": "https://cdn.nba.com/headshots/nba/latest/1040x760/203954.png"
  },
  {
    "firstName": "LeBron",
    "lastName": "James",
    "img": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png"
  },
  {
    "firstName": "Kawhi",
    "lastName": "Leonard",
    "img": "https://cdn.nba.com/headshots/nba/latest/1040x760/202695.png"
  },
  {
    "firstName": "Kevon",
    "lastName": "Looney",
    "img": "https://cdn.nba.com/headshots/nba/latest/1040x760/1626172.png"
  },
  {
    "firstName": "Brook",
    "lastName": "Lopez",
    "img": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3448.png&w=350&h=254"
  },
  {
    "firstName": "Khris",
    "lastName": "Middleton",
    "img": "https://a.espncdn.com/i/headshots/nba/players/full/6609.png"
  },
  {
    "firstName": "Bobby",
    "lastName": "Portis",
    "img": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3064482.png&w=350&h=254"
  },
  {
    "firstName": "Kristaps",
    "lastName": "Porzingis",
    "img": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3102531.png"
  },
  {
    "firstName": "Julius",
    "lastName": "Randle",
    "img": "https://a.espncdn.com/i/headshots/nba/players/full/3064514.png"
  },
  {
    "firstName": "Anderson",
    "lastName": "Varejao",
    "img": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/2419.png"
  },
  {
    "firstName": "Zion",
    "lastName": "Williamson",
    "img": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4395628.png"
  },
]

const playersArmador = [
  {
    "firstName": "Dillon",
    "lastName": "Brooks",
    "img": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3155526.png",
  },
  {
    "firstName": "Jaylen",
    "lastName": "Brown",
    "img": "https://a.espncdn.com/i/headshots/nba/players/full/3917376.png"
  },
  {
    "firstName": "Alex",
    "lastName": "Caruso",
    "img": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/2991350.png"
  },
  {
    "firstName": "Stephen",
    "lastName": "Curry",
    "img": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3975.png"
  },
  {
    "firstName": "Anthony",
    "lastName": "Edwards",
    "img": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4594268.png"
  },
  {
    "firstName": "Shai",
    "lastName": "Gilgeous-Alexander",
    "img": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4278073.png"
  },
  {
    "firstName": "James",
    "lastName": "Harden",
    "img": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3992.png"
  },
  {
    "firstName": "Kyrie",
    "lastName": "Irving",
    "img": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6442.png"
  },
  {
    "firstName": "Zach",
    "lastName": "LaVine",
    "img": "https://a.espncdn.com/i/headshots/nba/players/full/3064440.png"
  },
  {
    "firstName": "Damian",
    "lastName": "Lillard",
    "img": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6606.png&w=350&h=254"
  },
  {
    "firstName": "Didi",
    "lastName": "Louzada",
    "img": "https://lnb.com.br/wp-content/uploads/2016/10/DIDI.png"
  },
  {
    "firstName": "Donovan",
    "lastName": "Mitchell",
    "img": "https://cdn.nba.com/headshots/nba/latest/1040x760/1628378.png"
  },
  {
    "firstName": "Jamal",
    "lastName": "Murray",
    "img": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3936299.png&w=350&h=254"
  },
  {
    "firstName": "Chris",
    "lastName": "Paul",
    "img": "https://cdn.nba.com/headshots/nba/latest/1040x760/101108.png"
  },
  {
    "firstName": "Austin",
    "lastName": "Reaves",
    "img": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4066457.png&w=350&h=254"
  },
  {
    "firstName": "Derrick",
    "lastName": "Rose",
    "img": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3456.png"
  },
  {
    "firstName": "Collin",
    "lastName": "Sexton",
    "img": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4277811.png"
  },
  {
    "firstName": "Ben",
    "lastName": "Simmons",
    "img": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3907387.png"
  },
  {
    "firstName": "Jayson",
    "lastName": "Tatum",
    "img": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4065648.png"
  },
  {
    "firstName": "Klay",
    "lastName": "Thompson",
    "img": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6475.png"
  },
  {
    "firstName": "Russell",
    "lastName": "Westbrook",
    "img": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3468.png"
  },
  {
    "firstName": "Trae",
    "lastName": "Young",
    "img": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4277905.png"
  },
]

const state = reactive({
  name: undefined,
  age: undefined,
  feature: undefined,
  team: undefined,
  position: 0,
  agression: false,
  angry: false
})

let result = ''

let isOpen = ref(false)

let resultRandom:any = null

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Required' })
  if (!state.age) errors.push({ path: 'age', message: 'Required' })
  if (!state.feature) errors.push({ path: 'feature', message: 'Required' })
  if (!state.team) errors.push({ path: 'team', message: 'Required' })
  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {
  
}

function getResult() {
  //@ts-ignore
  if(state['name'].includes("Gabriel") || state['name'].includes("gabriel") || state['name'].includes("gab")) {
    return result + 'Nikola Jokic! WOWW!  vc é o maior da história da NBA!'
  //@ts-ignore
  } else if (state['name'].includes("Henrique") || state['name'].includes("Rick") || state['name'].includes("Calvo") || state['name'].includes("henrique") ||state['name'].includes("ricky") || state['name'].includes("calvo")) {
    return result + 'Luka Doncic! só visão e passes fora de série!'
  } else if(state.angry && state.agression) {
    return result + 'Ja Morant! apanha muito em jogo, e é agressivo pós jogo e nas redes sociais, OLHA O TIROOO!'
  }else if(state.angry) {
    return result + 'Draymond Greenn! por sua raiva ao jogar, cuidado, pode acabar machucando o amiguinho!'
  }else if(state.agression) {
    return result + 'Jordan Poole! piscininha amô! mas cuidado com o soco, por você apanhar bastante em jogos, suponhamos que seu jogador seja o Piscina!'
  } else {
    return resultRandom.firstName + " " + resultRandom.lastName
  }

}

function getImage() {
  //@ts-ignore
  if(state['name'].includes("Gabriel") || state['name'].includes("gabriel") || state['name'].includes("gab")) {
    return 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3112335.png'
    //@ts-ignore
  } else if (state['name'].includes("Henrique") || state['name'].includes("Rick") || state['name'].includes("Calvo") || state['name'].includes("henrique") ||state['name'].includes("ricky") || state['name'].includes("calvo")) {
    return 'https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png'
  } else if(state.angry && state.agression) {
    return 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4279888.png&w=350&h=254'
  } else if(state.angry) {
    return 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6589.png&w=350&h=254'
  } else if(state.agression) {
    return 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4277956.png'
  } else {
    if(isOpen.value) {
      getRandom();
      return resultRandom.img
    }
  }
}

async function getRandom() {
  resultRandom = null
  if(state.position == 1) {
    resultRandom = playersPivo[Math.floor(Math.random() * playersPivo.length)]
  } else {
    resultRandom = playersArmador[Math.floor(Math.random() * playersArmador.length)]
  }
}
</script>