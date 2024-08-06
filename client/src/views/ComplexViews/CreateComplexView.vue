<template>
  <navbarComp :roleProp="user.role" :nameProp="user.name"></navbarComp>
  <main>
    <primaryRouterButton400 href="/complexes"> Назад </primaryRouterButton400>
    <v-form @submit.prevent v-model="valid">
      <textField
        labelProp="Название"
        placeholderProp="Комплекс 1"
        v-model="name"
        :rulesProp="nameRules"
      >
      </textField>
      <p>{{ statusMessage }}</p>
      <agreeButton400 @click="checkValid(valid)">
        Добавить комплекс
      </agreeButton400>
    </v-form>
  </main>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "../../store/UserStore";
import { useComplexesStore } from "../../store/ComplexesStore";

export default {
  name: "CreateComplexView",
  data() {
    return {
      valid: false,

      statusMessage: "",

      name: "",

      nameRules: [(v) => v.length > 0 || "Введите название комплекса"],
    };
  },
  methods: {
    async checkValid(valid) {
      if (valid) {
        const complex = {
          name: this.name,
        };
        const res = await this.createComplex(complex);

        if (res.status === 400) {
          this.statusMessage = "Ошибка при создании, попробуйте ещё раз.";
        } else {
          this.$router.push("/complexes");
        }
      }
    },
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
    ...mapState(useComplexesStore, ["createComplex"]),
  },
};
</script>

<style scoped lang="scss">
main {
  width: 100%;
  height: calc(100vh - 80px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
p {
  text-align: center;
  color: red;
}
</style>
