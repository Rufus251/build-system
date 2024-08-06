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
        Изменить комплекс
      </agreeButton400>
    </v-form>
  </main>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "../../store/UserStore";
import { useComplexesStore } from "../../store/ComplexesStore";

export default {
  name: "EditComplexView",
  data() {
    return {
      valid: false,

      statusMessage: "",

      name: "",

      nameRules: [(v) => v.length > 0 || "Введите название комплекса"],
    };
  },
  mounted() {
    const id = this.$route.params.id;
    const complex = this.getComplexById(+id);

    this.name = complex.name;
  },
  methods: {
    async checkValid(valid) {
      if (valid) {
        const complex = {
          name: this.name,
        };
        const res = await this.updateComplex(+this.$route.params.id, complex);

        if (res.status >= 400) {
          this.statusMessage = "Ошибка при обновлении, попробуйте ещё раз.";
        } else {
          this.$router.push("/complexes");
        }
      }
    },
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
    ...mapState(useComplexesStore, ["updateComplex", "getComplexById"]),
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
