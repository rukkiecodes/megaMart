<template>
    <v-navigation-drawer width="200" border="0">
        <v-list class="pa-2" density="compact">
            <v-list-item v-for="(route, i) in routes" :key="i" :to="route.to" nav density="compact" rounded="lg"
                active-color="blue">
                <v-list-item-title>{{ route.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import { useNavStore } from '@/store/app/nav';

const { routes } = useNavStore()
</script>