<template>
  <v-container>
    <v-toolbar color="transparent">
      <v-toolbar-title> Post Ad </v-toolbar-title>
    </v-toolbar>
    <v-row>
      <v-col cols="12" sm="4">
        <v-sheet
          @click="clickInput"
          class="bg-blue d-flex justify-center align-center"
          rounded="xl"
          min-height="200"
        >
          <v-icon v-if="!image">mdi-image-plus</v-icon>
          <v-img v-else :src="image"></v-img>
        </v-sheet>
        <input
          @change="setImage"
          type="file"
          style="display: none"
          id="imageInput"
        />

        <v-card flat>
          <v-card-title>Variations</v-card-title>
          <v-card-text v-if="sell.form.variations.length >= 1">
            <v-chip
              v-for="(variation, i) in sell.form.variations"
              :key="i"
              @dblclick="sell.form.variations.splice(i, 1)"
              class="ma-2"
              >{{ variation }}</v-chip
            >
          </v-card-text>
          <v-card-text v-else class="text-grey-darken-4"
            >You ave not listed any variation</v-card-text
          >
        </v-card>
        <v-list>
          <v-list-item>
            <v-list-item-title>Shipping Options</v-list-item-title>
            <v-list-item-subtitle v-if="sell.shippingOptions == ''"
              >You have not listed any variation</v-list-item-subtitle
            >
            <v-list-item-subtitle v-else>{{
              sell.shippingOptions
            }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-col>

      <v-col cols="12" sm="8">
        <v-row>
          <v-col cols="12" sm="6">
            <v-file-input
              @change="setImage"
              label="product-img"
              variant="underlined"
              density="comfortable"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              label="Product-name"
              variant="underlined"
              density="comfortable"
              v-model="sell.form.name"
            />
          </v-col>

          <v-col cols="12">
            <v-textarea
              label="Description"
              variant="underlined"
              density="comfortable"
              rows="4"
              auto-grow
              max-rows="10"
              v-model="sell.form.description"
            ></v-textarea>
          </v-col>

          <v-col cols="12" sm="6">
            <v-autocomplete
              label="Category"
              :items="app.categories"
              item-title="name"
              item-value="name"
              variant="underlined"
              density="comfortable"
              @update:model-value="(e) => currentSub(e)"
              v-model="sell.form.category"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-autocomplete
              label="Sub category"
              :items="subCategory"
              variant="underlined"
              density="comfortable"
              v-model="sell.form.subcategory"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              label="Price"
              variant="underlined"
              density="comfortable"
              v-model="sell.form.price"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              label="Quantity"
              variant="underlined"
              density="comfortable"
              v-model="sell.form.quantity"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              label="Variations"
              variant="underlined"
              density="comfortable"
              v-model="sell.variations"
              @keypress.enter="setVariations"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              label="Weight"
              variant="underlined"
              density="comfortable"
              type="number"
              v-model="sell.form.weight"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              label="Dimensions"
              variant="underlined"
              density="comfortable"
              v-model="sell.form.dimensions"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-select
              :items="['Door Delivery', 'Pickup Station']"
              label="Shipping Options"
              variant="underlined"
              density="comfortable"
              v-model="sell.shippingOptions"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              label="Shipping cost"
              variant="underlined"
              density="comfortable"
              type="number"
              v-model="sell.form.shippingCost"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              label="Condition"
              variant="underlined"
              density="comfortable"
              v-model="sell.form.condition"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              label="Brand"
              variant="underlined"
              density="comfortable"
              v-model="sell.form.brand"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              label="ModelNumber"
              variant="underlined"
              density="comfortable"
              v-model="sell.form.ModelNumber"
            />
          </v-col>
        </v-row>

        <v-btn
          @click="sell.createAd"
          :loading="sell.loading"
          block
          class="bg-blue"
          >POST AD</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAppStore } from "@/store/app";
import { useSellStore } from "@/store/sell";
import { ref } from "vue";

let image = ref(null);
let subCategory = ref([]);

const app = useAppStore();
const sell = useSellStore();

const clickInput = () => {
  document.querySelector("#imageInput").click();
};

const setImage = (event) => {
  let file = event.target.files[0];

  if (!file) return;

  image.value = URL.createObjectURL(file);

  sell.image = file;
};

const currentSub = (e) => {
  let currnetSubcategories = app.categories.filter((obj) => obj.name === e);
  let object = { ...currnetSubcategories }[0].subcategories;
  subCategory.value = object;
};

const setVariations = () => {
  if (sell.variations == "") return;

  sell.form.variations.push(sell.variations);
  sell.variations = "";
};

const setShippingOptions = () => {
  if (sell.shippingOptions == "") return;

  sell.form.shippingOptions.push(sell.shippingOptions);
  sell.shippingOptions = "";
};
</script>
