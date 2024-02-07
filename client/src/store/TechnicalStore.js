import { defineStore } from "pinia";

import axios from "axios";

export const useTechnicalStore = defineStore("TechnicalStore", {
  state: () => ({
    url: "http://localhost:3001/api/",
    // url: "http://45.132.18.153/api/",


    tech: [],
  }),
  getters: {
    techNames(state) {
      return state.tech.map((el) => el.name);
    },
  },
  actions: {
    async fetchTech() {
      try {
        const url = this.url + "report-data-type";
        const res = await axios.get(url);
        
        this.tech = res.data
        
        return this.tech;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async deleteTech(id) {
      try {
        const url = this.url + "report-data-type/" + id;
        const res = await axios.delete(url);

        await this.fetchTech();

        return res;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async createTech(tech) {
      try {
        const url = this.url + "report-data-type";

        const res = await axios.post(url, {
          ...tech,
        });

        await this.fetchTech();
        return res;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    sortTechByValue(autocompleteValue) {
      if (!autocompleteValue) {
        return this.tech;
      } else {
        const result = this.tech.filter((el) => el.name === autocompleteValue);
        return result;
      }
    },
    getTechById(id){
      return this.tech.find((el) => el.id === id);
    },
    getTechByName(name){
      return this.tech.find((el) => el.name === name);
    },
    getTechNameById(id){
      const tech = this.tech.find((el) => el.id === id)
      return tech.name;
    },
    
  },
});
