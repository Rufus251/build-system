import { defineStore } from "pinia";

import axios from "axios";

import { useMainStore } from "./MainStore";
import { useLoaderStore } from "./LoaderStore";

export const useComplexesStore = defineStore("ComplexesStore", {
  state: () => ({
    mainStore: useMainStore(),
    loaderStore: useLoaderStore(),

    url: useMainStore().url,

    complexes: [],
    sortedComplexes: [],
    complexNames: [],
  }),
  getters: {},
  actions: {
    async fetchAllComplexes() {
      try {
        this.loaderStore.isLoading = true;

        const urlComplexes = this.url + "residential-complex";
        const resComplexes = await axios.get(urlComplexes, {
          headers: { Authorization: this.mainStore.token },
        });

        this.complexes = resComplexes.data;
        this.complexNames = resComplexes.data.map((el) => el.name);
        this.sortedComplexes = resComplexes.data;

        this.loaderStore.isLoading = false;

        return this.complexes;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error;
      }
    },
    async createComplex(complex) {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + "residential-complex";

        let res = await axios.post(
          url,
          { ...complex },
          {
            headers: {
              Authorization: this.mainStore.token,
            },
          }
        );

        await this.fetchAllComplexes();

        this.loaderStore.isLoading = false;

        return res;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error.response;
      }
    },
    async updateComplex(id, complex) {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + "residential-complex/" + id;

        let res = await axios.patch(
          url,
          { ...complex },
          {
            headers: {
              Authorization: this.mainStore.token,
            },
          }
        );

        console.log(res);

        await this.fetchAllComplexes();

        this.loaderStore.isLoading = false;

        return res;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error.response;
      }
    },
    async deleteComplex(id) {
      try {
        this.loaderStore.isLoading = true;

        const url = this.url + "residential-complex/" + id;

        let res = await axios.delete(url, {
          headers: {
            Authorization: this.mainStore.token,
          },
        });

        await this.fetchAllComplexes();

        this.loaderStore.isLoading = false;

        return res;
      } catch (error) {
        console.log(error);
        this.loaderStore.isLoading = false;
        return error.response;
      }
    },
    getComplexById(id) {
      return this.complexes.find((el) => el.id === id);
    },
    getComplexByName(name) {
      return this.complexes.find((el) => el.name === name);
    },
    sortComplexesByName(complexName) {
      if (!complexName.length || complexName === "Без сортировки") {
        this.sortedComplexes = this.complexes;
        return this.sortedComplexes;
      }
      let sortedComplexes = [];
      this.complexes.forEach((complex) => {
        if (complex.name === complexName) {
          sortedComplexes.push(complex);
        }
      });

      this.sortedComplexes = sortedComplexes;
      return this.sortedComplexes;
    },
  },
});
