<template>
  <v-container>
    <v-row>
      <v-col v-for="(good, i) in shopListing.goods" :key="i" cols="12" sm="6" md="3">
        <v-card rounded="xl">
          <v-img :src="good.image" />

          <v-card-title>{{ good.name }}</v-card-title>
          <v-card-text class="d-flex justify-space-between"><span>₦ {{
            good.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span> <span>{{
    good.availability }}</span></v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useShoplistingStore } from '@/store/app/shoplisting';
import { ref } from 'vue';

const shopListing = ref(useShoplistingStore())
</script>