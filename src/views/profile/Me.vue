<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3">
        <v-card rounded="lg" elevation="5">
          <v-card-text class="text-center">
            <v-avatar size="70" color="blue">
              <v-icon>mdi-account</v-icon>
            </v-avatar>

            <v-card-title class="text-center">{{
              profile.user?.name
            }}</v-card-title>
            <v-card-subtitle class="text-center">{{
              profile.user?.email
            }}</v-card-subtitle>
            <v-btn size="x-small" rounded="lg" color="blue-lighten-4" class="mt-2 text-capitalize text-blue" flat>
              Update profile

              <v-dialog activator="parent" v-model="profile.dialog" width="300">
                <v-card rounded="xl">
                  <v-toolbar density="compact" color="transparent">
                    <v-toolbar-title>Edit Profile</v-toolbar-title>
                    <v-spacer />
                    <v-btn @click="profile.dialog = false" icon size="small">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-toolbar>

                  <v-card-text>
                    <v-text-field v-model="profile.user.name" label="Name" variant="underlined" color="blue" />
                    <v-text-field v-model="profile.user.phone" label="Phone" variant="underlined" color="blue" />

                    <v-textarea v-model="profile.user.address" label="Address" variant="underlined" color="blue" />
                  </v-card-text>

                  <v-card-actions>
                    <v-btn :loading="profile.user.loading" @click="profile.updateProfile()" block color="blue"
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
        <v-sheet v-if="shopListing.myGoods.length < 1" min-height="400">
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
          <v-col v-for="(good, i) in shopListing.myGoods" :key="i" cols="12" sm="6" md="4">
            <v-card @click="dialog = { active: true, ...good }" rounded="xl">
              <v-img :src="good.image" />

              <v-card-title>{{ good.name }}</v-card-title>
              <v-card-text class="d-flex justify-space-between"><span>₦
                  {{
                    good.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }}</span>
                <span>{{ good.availability }}</span></v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialog.active" width="500" scrollable>
    <v-card>
      <v-toolbar density="compact" color="white">
        <v-spacer />

        <v-btn @click="dialog.active = false" size="small" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text style="max-height: 600px;">
        <v-text-field label="Product description" variant="underlined" density="comfortable"
          v-model="dialog.description" />

        <v-text-field label="Price" variant="underlined" density="comfortable" v-model="dialog.price" />

        <v-text-field label="Quantity" variant="underlined" density="comfortable" v-model="dialog.quantity" />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn @click="deleteItem" class="text-capitalize bg-red">
          Delete Item
        </v-btn>

        <v-btn @click="updateItem" class="text-capitalize bg-primary">
          Save Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { db } from "@/plugins/firebase";
import { useProfileStore } from "@/store/profile";
import { useShoplistingStore } from "@/store/shoppingList";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

export default {
  data: () => ({
    dialog: {
      active: false,
      description: '',
      price: 0,
      quantity: 0
    }
  }),

  setup() {
    const profile = useProfileStore();
    const shopListing = useShoplistingStore();

    return {
      profile,
      shopListing
    }
  },

  methods: {
    async updateItem() {
      await updateDoc(doc(db, 'ads', this.dialog.id), {
        description: this.dialog.description,
        price: parseFloat(this.dialog.price),
        quantity: parseFloat(this.dialog.quantity)
      })

      this.dialog.active = false
    },

    async deleteItem() {
      await deleteDoc(doc(db, 'ads', this.dialog.id))

      this.dialog.active = false
    },
  }
}
</script>
