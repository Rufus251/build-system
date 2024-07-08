import { defineStore } from "pinia";

export const useMainStore = defineStore("MainStore", {
  state: () => ({
    url: "http://localhost:3001/api/",
    // url: "http://194.87.74.11/api/",
    token: ""
  }),
  actions: {
    setJwtToken() {
      let authorization = document.cookie
        .split("; ")
        .find((row) => row.startsWith("Authorization="));
      authorization = authorization ? authorization.split("=")[1] : null;
  
      this.token = "Bearer " + authorization;
      return this.token;
    },
  },
});
