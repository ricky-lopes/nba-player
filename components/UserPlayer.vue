<template>
    <div class="p-8 w-96 cursor-pointer rounded-3xl bg-blue-500 transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-2xl">
        <div class="-mb-20 -translate-y-1/2 transform">
            <NuxtImg :src="image" />
        </div>
        <div class="text-center">
            <h3 class="text-center text-4xl font-bold">{{ name }} </h3>
        </div>
    </div>
</template>

<script setup lang="ts">

defineProps({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})


</script>