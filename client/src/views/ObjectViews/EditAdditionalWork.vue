<template>
  <navbarComp :roleProp="user.role" :nameProp="user.name"></navbarComp>
  <main>
    <v-form @submit.prevent v-model="valid">
      <primaryButton400 @click="$router.back()"> Назад </primaryButton400>
      <textField
        labelProp="Название работы"
        placeholderProp="Работа номер 1"
        :rulesProp="nameRules"
        v-model="additonalWork.name">
      </textField>
      <textField
        labelProp="Ед. Изм."
        placeholderProp="м2"
        :rulesProp="unitRules"
        v-model="additonalWork.unit">
      </textField>
      <textField
        labelProp="Всего"
        placeholderProp="1000"
        :rulesProp="totalRules"
        v-model="additonalWork.total">
      </textField>
      <agreeButton400 @click="checkValid(valid)"> Обновить </agreeButton400>
    </v-form>
  </main>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "../../store/UserStore";
import { useObjectsStore } from "../../store/ObjectsStore";

export default {
  data() {
    return {
      valid: false,

      additonalWork: {
        id: "",
        name: "",
        unit: "",
        total: "",
      },

      // nameRules: [(v) => v.length > 0 || "Введите название"],
      // unitRules: [(v) => v.length > 0 || "Введите единицы измерения"],
      // totalRules: [(v) => v.length > 0 || "Введите макс значение"],
    };
  },
  async mounted() {
    const id = this.$route.params.rowId;
    const res = await this.getAdditionalWorkById(+id);
    const additionalWork = res.data;

    this.additonalWork.id = id;
    this.additonalWork.name = additionalWork.name;
    this.additonalWork.unit = additionalWork.unit;
    this.additonalWork.total = additionalWork.total;
  },
  methods: {
    async checkValid(valid) {
      if (valid) {
        let additionalWork = {
          name: this.additonalWork.name,
          unit: this.additonalWork.unit,
          total: +this.additonalWork.total,
        };

        const res = await this.updateAdditionalWork(
          this.additonalWork.id,
          additionalWork
        );

        if (res.status === 200) {
          alert("Данные обновлены");
          this.$router.back();
        } else {
          alert("Ошибка при обновлении данных");
        }
      }
    },
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
    ...mapState(useObjectsStore, [
      "getAdditionalWorkById",
      "updateAdditionalWork",
    ]),
  },
};
</script>

<style scoped>
main {
  width: 100%;
  height: calc(100vh - 80px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
