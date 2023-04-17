<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3">
        <v-card rounded="lg" elevation="5">
          <v-card-text class="text-center">
            <v-avatar size="70" color="blue">
              <v-icon>mdi-account</v-icon>
            </v-avatar>

            <v-card-title class="text-center">{{ profile?.name }}</v-card-title>
            <v-card-subtitle class="text-center">{{ profile?.email }}</v-card-subtitle>
          </v-card-text>

          <v-card-subtitle v-if="profile?.phone != undefined" class="font-weight-bold">Phone</v-card-subtitle>
          <v-card-text v-if="profile?.phone != undefined" class="pt-0">
            {{ profile?.phone }}
          </v-card-text>
          <v-card-subtitle v-if="profile?.address != undefined" class="font-weight-bold">Address</v-card-subtitle>
          <v-card-text v-if="profile?.address != undefined" class="pt-0">
            {{ profile?.address }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="9">
        <v-sheet min-height="400">
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
            </v-card>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { doc, getDoc } from '@firebase/firestore';
import { db } from '@/plugins/firebase';

export default {
  data: () => ({
    profile: null
  }),

  mounted() {
    this.getProfile(this.$route.params.profile)
  },

  methods: {
    async getProfile(prop) {
      let user = (await getDoc(doc(db, 'users', prop))).data()

      this.profile = user
    }
  }
}

</script>
