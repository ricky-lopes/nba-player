<template>
    <div class="container bg-cover bg-[url('/assets/wallpaper-nba.jpg')]">
        <slot />
    </div>
</template>

<style scoped>
.container {
    @apply w-full h-screen p-8 flex flex-col items-start min-w-full;
}
</style>