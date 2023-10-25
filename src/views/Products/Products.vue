<template>
  <v-container>
    <v-row>
      <v-col
        v-for="product in sell.products"
        :key="product.id"
        cols="12"
        sm="6"
        md="2"
      >
        <v-card :to="`/app/${product?.id}`">
          <v-img
            :src="product.image"
            aspect-ratio="16/9"
            max-height="120"
            cover
          />
          <v-card-title class="text-body-2">{{ product?.name }}</v-card-title>
          <v-card-text class="d-flex justify-space-between">
            <span>{{ product?.price }}</span>
            <span>{{
              product?.quantity >= 1 ? "In Stock" : "Out of Stock"
            }}</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useSellStore } from "@/store/sell";

const sell = useSellStore();
</script>
