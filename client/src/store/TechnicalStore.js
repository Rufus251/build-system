import { defineStore } from "pinia";

export const useTechnicalStore = defineStore("TechnicalStore", {
  state: () => ({
    tech: [
      {
        id: 1,
        name: "Шифер",
      },
      {
        id: 2,
        name: "Сланец",
      },
      {
        id: 3,
        name: "Арматура",
      },
      {
        id: 4,
        name: "Бетон",
      },
    ],
  }),
  getters: {
    techNames(state) {
      return state.tech.map((el) => el.name);
    },
  },
  actions: {
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
    getTechNameById(id){
      const tech = this.tech.find((el) => el.id === id)
      return tech.name;
    },
    deleteTech(id) {
      const result = this.tech.filter((el) => el.id !== id);
      this.tech = result;
    },
    createTech(tech) {
      this.tech.push({ ...tech });
    },
  },
});
