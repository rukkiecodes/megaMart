<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3">
        <v-card rounded="lg" elevation="5">
          <v-card-text class="text-center">
            <v-avatar size="70" color="blue">
              <v-icon>mdi-account</v-icon>
            </v-avatar>

            <v-card-title class="text-center">{{ profile.user?.name }}</v-card-title>
            <v-card-subtitle class="text-center">{{ profile.user?.email }}</v-card-subtitle>
            <v-btn size="x-small" rounded="lg" color="blue-lighten-4" class="mt-2 text-capitalize text-blue" flat>
              Update profile

              <v-dialog activator="parent" v-model="profileUpdate.dialog" width="300">
                <v-card rounded="xl">
                  <v-toolbar density="compact" color="transparent">
                    <v-toolbar-title>Edit Profile</v-toolbar-title>
                    <v-spacer />
                    <v-btn @click="profileUpdate.dialog = false" icon size="small">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-toolbar>

                  <v-card-text>
                    <v-text-field v-model="profileUpdate.name" label="Name" variant="underlined" color="blue" />
                    <v-text-field v-model="profileUpdate.phone" label="Phone" variant="underlined" color="blue" />

                    <v-textarea v-model="profileUpdate.address" label="Address" variant="underlined" color="blue" />
                  </v-card-text>

                  <v-card-actions>
                    <v-btn :loading="profileUpdate.loading" @click="profileUpdate.update" block color="blue"
                      class="text-capitalize">Update Profile</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-btn>
          </v-card-text>

          <v-card-subtitle v-if="profile.user?.phone != undefined" class="font-weight-bold">Phone</v-card-subtitle>
          <v-card-text v-if="profile.user?.phone != undefined" class="pt-0">
            {{ profile.user?.phone }}
          </v-card-text>
          <v-card-subtitle v-if="profile.user?.address != undefined" class="font-weight-bold">Address</v-card-subtitle>
          <v-card-text v-if="profile.user?.address != undefined" class="pt-0">
            {{ profile.user?.address }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="9">
        <v-sheet v-if="shoplisting.myGoods.length < 1" min-height="400">
          <v-container>
            <v-toolbar color="transparent">
              <v-toolbar-title>My adverts</v-toolbar-title>
            </v-toolbar>
            <v-card width="300" class="mx-auto" flat color="transparent">
              <v-card-text>
                <v-img
                  src="https://assets.jiji.ng/static/img/profile-redesign/adverts/no-adverts-images/no-adverts-active.svg" />
              </v-card-text>
              <v-card-text class="text-center">
                There are no adverts yet.
              </v-card-text>
              <v-card-text class="text-center pt-0">
                Create new one now!
              </v-card-text>
            </v-card>
          </v-container>
        </v-sheet>
        <v-row v-else dense>
          <v-col v-for="(good, i) in shoplisting.myGoods" :key="i" cols="12" sm="6" md="4">
            <v-card rounded="xl">
              <v-img :src="good.image" />

              <v-card-title>{{ good.name }}</v-card-title>
              <v-card-text class="d-flex justify-space-between"><span>₦ {{
                good.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span> <span>{{
    good.availability }}</span></v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useProfileStore } from "@/store/app/profile/getProfile";
import { useUpdateProfileStore } from "@/store/app/profile/updateProfile";
import { useShoplistingStore } from '@/store/app/shoplisting';

const profile = ref(useProfileStore())
const profileUpdate = useUpdateProfileStore()
const shoplisting = useShoplistingStore()
</script>
