import { defineStore } from "pinia";

export const useLoaderStore = defineStore("LoaderStore", {
  state: () => ({
    isLoading: false,
  }),
  getters: {},
  actions: {},
});
