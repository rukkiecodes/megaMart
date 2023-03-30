<template>
  <v-container>
    <v-row>
      <v-col v-for="(good, i) in goods" :key="i" cols="12" sm="6" md="3">
        <v-card rounded="xl" elevation="5">
          <v-card-text>
            <v-img :src="good.image" />
          </v-card-text>

          <v-card-title>{{ good.title }}</v-card-title>
          <v-card-actions>
            <v-btn class="bg-blue text-capitalize" block rounded="xl">View Item</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useShoplistingStore } from '@/store/app/shoplisting';

const { goods } = useShoplistingStore()
</script>