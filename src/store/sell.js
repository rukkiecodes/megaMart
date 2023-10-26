import { defineStore } from "pinia";

import router from "@/router";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/plugins/firebase";
import { useAppStore } from "./app";

const app = useAppStore();

export const useSellStore = defineStore("sell", {
  state: () => ({
    image: null,
    imagePreview: null,
    variations: "",
    shippingOptions: "",

    form: {
      name: "name",
      description: "description",
      category: "category",
      subcategory: "",
      price: 20000,
      quantity: 1,
      variations: [],
      weight: 20,
      dimensions: "dimensions",
      shippingOptions: [],
      shippingCost: 1000,
      condition: "",
      brand: "",
      modelNumber: "",
    },

    loading: false,

    products: [],
  }),

  actions: {
    async createAd() {
      let input = this.form;

      const userData = await JSON.parse(localStorage.megamartUser);

      if (
        input.name == "" ||
        input.description == "" ||
        input.category == "" ||
        input.subcategory.length < 1 ||
        !this.image ||
        input.price == 0 ||
        input.quantity == 0 ||
        input.shippingCost == 0
      ) {
        app.snackbar = true;
        app.snackbarColor = "warning";
        app.snackbarText = "Please complete the form";
      } else {
        let file = this.image;

        const storage = getStorage();

        let link = `goods/${userData.uid}/${file.name}`;

        const storageRef = ref(storage, link);

        const uploadTask = uploadBytesResumable(storageRef, file);

        this.loading = true;

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await addDoc(collection(db, "ads"), {
                  name: this.form.name,
                  description: this.form.description,
                  category: this.form.category,
                  subcategory: this.form.subcategory,
                  price: this.form.price,
                  quantity: parseFloat(this.form.quantity),
                  variations: this.form.variations,
                  weight: this.form.weight,
                  dimensions: this.form.dimensions,
                  shippingOptions: this.form.shippingOptions,
                  shippingCost: this.form.shippingCost,
                  condition: this.form.condition,
                  brand: this.form.brand,
                  modelNumber: this.form.modelNumber,
                  seller: userData.uid,
                  image: downloadURL,
                  imageLink: uploadTask.snapshot.ref.fullPath,
                  dateCreated: serverTimestamp(),
                  status: "active",
                  availability: "in stock",
                });

                this.loading = false;

                app.snackbar = true;
                app.snackbarColor = "green";
                app.snackbarText = "Ad uploaded successfully";
              }
            );
          }
        );
      }
    },

    async getItems() {
      let querysnapshot = await getDocs(collection(db, "ads"));
      let array = [];
      querysnapshot.forEach((item) => {
        array.push({
          id: item.id,
          ...item.data(),
        });

        this.products = array;
      });
    },
  },
});
