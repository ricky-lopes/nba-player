<template>
    <h1 class="text-xl font-bold">Qual Jogador de Basquete é você?</h1>

    <UForm :validate="validate" :state="user" class="space-y-4 my-4 w-full">
      <UFormGroup label="Nome" name="name">
        <UInput color="cyan" v-model="user.name" />
      </UFormGroup>
      
      <UFormGroup label="Idade" name="age">
        <UInput color="cyan" v-model="user.age" type="number" />
      </UFormGroup>

      <UFormGroup label="Pricipal Característica" name="feature">
        <UInput color="cyan" v-model="user.feature" />
      </UFormGroup>

      <UFormGroup label="Se você fosse draftado por um time na NBA, qual seria?" name="team">
        <USelect color="cyan" v-model="user.team" :options="nbaData.teams" option-attribute="name"/>
      </UFormGroup>

      <UFormGroup label="Qual sua posição?" name="team">
        <USelect color="cyan" v-model="user.position" :options="nbaData.positions" option-attribute="name"/>
      </UFormGroup>

      <UFormGroup label="Você se estressa jogando basquete?" name="angry">
        <UToggle
          on-icon="i-heroicons-check-20-solid"
          off-icon="i-heroicons-x-mark-20-solid"
          color="blue"
          v-model="user.angry"
        />
      </UFormGroup>

      <UFormGroup label="Costuma apanhar muito em jogos?" name="agression">
        <UToggle
          on-icon="i-heroicons-check-20-solid"
          off-icon="i-heroicons-x-mark-20-solid"
          color="blue"
          v-model="user.agression"
        />
      </UFormGroup>

      <div class="flex gap-3 w-full justify-center">
        <UButton type="submit" :disabled="!canOpen" color="blue" :variant="!canOpen ? `soft` : `solid`" size="xl" @click="getPlayerForUser()">
          Pesquisar
        </UButton>
      </div>
    </UForm>

  <UModal v-model="isOpen">
    <div class="p-8 flex flex-col gap-12 items-center" v-if="isOpen">
      <div class="w-full flex justify-between">
        <h1 class="font-bold">Seu jogador é:</h1>
        <UIcon @click="toggleModal()" name="i-heroicons-x-mark" class="cursor-pointer" />
      </div>
      <user-player 
        :image="playerResult!.image" 
        :name="playerResult!.label"
        :comments="playerResult!.comments">
      </user-player>
    </div>
   </UModal>
</template>

<script setup lang="ts">
import type { FormError } from '#ui/types'
import type { User } from "~/types/user"

const nbaData = useNBAData()
const { playerResult, getPlayerResult } = usePlayerResult()
const { isOpen, toggleModal } = useModal()

const user = reactive<User>({
  name: "",
  age: 0,
  feature: "",
  team: "",
  position: 0,
  agression: false,
  angry: false
})

const canOpen = computed(() => {
  return (user.name.length > 0) && (user.age > 0) && (user.feature.length > 0) && (user.position > 0) && (user.team.length > 0)
})

const validate = (user: any): FormError[] => {
  const errors = []
  if (!user?.name) errors.push({ path: 'name', message: 'Required' })
  if (!user?.age) errors.push({ path: 'age', message: 'Required' })
  if (!user?.feature) errors.push({ path: 'feature', message: 'Required' })
  if (!user?.team) errors.push({ path: 'team', message: 'Required' })
  return errors
}

const getPlayerForUser = () => {
  getPlayerResult(user)
  toggleModal()
}

</script>