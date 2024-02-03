<template>
  <navbarComp :roleProp="user.role" :nameProp="user.name"></navbarComp>
  <main>
    <v-form @submit.prevent v-model="valid">
      <textField
        labelProp="Название"
        placeholderProp="Шифер"
        v-model="name"
        :rulesProp="nameRules"></textField>
      <agreeButton400 @click="checkValid(valid)">
        Добавить tech
      </agreeButton400>
    </v-form>
  </main>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "../store/UserStore";
import { useTechnicalStore } from "../store/TechnicalStore";

export default {
  name: "CreateUserView",
  data() {
    return {
      valid: false,

      name: "",

      nameRules: [(v) => v.length > 0 || "Введите название"],
    };
  },
  methods: {
    async checkValid(valid) {
      if (valid) {
        const tech = {
          name: this.name
        };
        await this.createTech(tech);
        this.$router.push("/technical");
      }
    },
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
    ...mapState(useTechnicalStore, ["tech", "createTech"]),
  },
};
</script>

<style scoped lang="scss"></style>
