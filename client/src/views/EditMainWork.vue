<template>
  <navbarComp :roleProp="user.role" :nameProp="user.name"></navbarComp>
  <main>
    <v-form @submit.prevent v-model="valid">
      <primaryButton400 @click="$router.back()"> Назад </primaryButton400>
      <textField
        labelProp="Название работы"
        placeholderProp="Работа номер 1"
        :rulesProp="nameRules"
        v-model="mainWork.name">
      </textField>
      <textField
        labelProp="Ед. Изм."
        placeholderProp="м2"
        :rulesProp="unitRules"
        v-model="mainWork.unit">
      </textField>
      <textField
        labelProp="Максимальное значение"
        placeholderProp="1000"
        :rulesProp="maxValueRules"
        v-model="mainWork.maxValue">
      </textField>
      <textField
        labelProp="Выполнено"
        placeholderProp="0"
        :rulesProp="doneRules"
        v-model="mainWork.done">
      </textField>
      <textField
        labelProp="Осталось"
        placeholderProp="1000"
        :rulesProp="leftRules"
        v-model="mainWork.left">
      </textField>
      <agreeButton400 @click="checkValid(valid)"> Обновить </agreeButton400>
    </v-form>
  </main>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "../store/UserStore";
import { useObjectsStore } from "../store/ObjectsStore";

export default {
  data() {
    return {
      valid: false,

      mainWork: {
        id: "",
        name: "",
        unit: "",
        maxValue: "",
        done: "",
        left: "",
      },

      // nameRules: [(v) => v.length > 0 || "Введите название"],
      // unitRules: [(v) => v.length > 0 || "Введите единицы измерения"],
      // maxValueRules: [(v) => v.length > 0 || "Введите макс значение"],
      // doneRules: [(v) => v.length > 0 || "Введите выполнено"],
      // leftRules: [(v) => v.length > 0 || "Введите осталось"],
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    const res = await this.getMainWorkById(+id);
    const mainWork = res.data;

    this.mainWork.id = id;
    this.mainWork.name = mainWork.name;
    this.mainWork.unit = mainWork.unit;
    this.mainWork.maxValue = mainWork.maxValue;
    this.mainWork.done = mainWork.done;
    this.mainWork.left = mainWork.left;
  },
  methods: {
    async checkValid(valid) {
      if (valid) {
        let mainWork = {
          name: this.mainWork.name,
          unit: this.mainWork.unit,
          maxValue: this.mainWork.maxValue,
          done: this.mainWork.done,
          left: this.mainWork.left,
        };

        const res = await this.updateMainWork(this.mainWork.id, mainWork);

        if (res.status === 200) {
          alert("Данные обновлены");
          this.$router.back()
        } else {
          alert("Ошибка при обновлении данных");
        }
      }
    },
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
    ...mapState(useObjectsStore, ["getMainWorkById", "updateMainWork"]),
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
