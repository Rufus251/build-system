<template>
  <navbarComp :roleProp="user.role" :nameProp="user.name"></navbarComp>
  <main>
    <primaryRouterButton400 href="/users"> Назад </primaryRouterButton400>
    <v-form @submit.prevent v-model="valid">
      <textField
        labelProp="Логин"
        placeholderProp="Ivanov_Ivan15666"
        v-model="login"
        :rulesProp="loginRules">
      </textField>
      <textField
        labelProp="Пароль"
        placeholderProp="ao34KFKA333"
        v-model="password"
        type="password"
        :rulesProp="passwordRules"></textField>
      <textField
        labelProp="ФИО сотрудника"
        placeholderProp="Иванов Иван"
        v-model="name"
        :rulesProp="nameRules"></textField>
      <textField
        labelProp="Номер телефона"
        placeholderProp="+79992224455"
        v-model="phone"
        :rulesProp="phoneRules"></textField>
      <textField
        labelProp="Должность"
        placeholderProp="Сотрудник"
        v-model="position"
        :rulesProp="positionRules"></textField>

      <autocompleteField
        labelProp="Роль"
        placeholderProp="admin"
        v-model="role"
        :itemsProp="roles"
        :rulesProp="roleRules"></autocompleteField>
      <autocompleteField
        labelProp="Комплексы *для сортировки объектов*"
        placeholderProp="Название комплекса"
        v-model="complexes"
        :itemsProp="['Без фильтра', ...complexNames]"
        :rulesProp="complexRules"></autocompleteField>
      <autocompleteField
        labelProp="Объекты к которым привязан пользователь"
        placeholderProp="Название объекта"
        v-model="objects"
        :itemsProp="sortedObjectNames"
        :rulesProp="objectRules"
        multiple></autocompleteField>
      <p>{{ statusMessage }}</p>
      <agreeButton400 @click="checkValid(valid)">
        Создать пользователя
      </agreeButton400>
    </v-form>
  </main>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "../store/UserStore";
import { useUsersStore } from "../store/UsersStore";

export default {
  name: "CreateUserView",
  data() {
    return {
      valid: false,

      statusMessage: "",

      login: "",
      password: "",
      name: "",
      phone: "",
      position: "",

      role: [],
      complexes: [],
      objects: [],

      loginRules: [(v) => v.length > 0 || "Введите логин"],
      passwordRules: [(v) => v.length > 0 || "Введите пароль"],
      nameRules: [(v) => v.length > 0 || "Введите имя"],
      positionRules: [(v) => v.length > 0 || "Введите должность"],
      phoneRules: [(v) => v.length > 0 || "Введите телефон"],
      roleRules: [(v) => v.length > 0 || "Выберите роль"],
      complexRules: [],
      objectRules: [],
    };
  },
  methods: {
    async checkValid(valid) {
      if (valid) {
        const user = {
          login: this.login,
          password: this.password,
          name: this.name,
          phone: this.phone,
          position: this.position,
          role: this.role,
          token: "",
        };
        const res = await this.createUser(user, this.objects);

        if (res.status === 400) {
          this.statusMessage = "Ошибка при создании, попробуйте ещё раз.";
        } else {
          this.$router.push("/users");
        }
      }
    },
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
    ...mapState(useUsersStore, [
      "sortObjectsByComplexes",
      "roles",
      "sortedObjectNames",
      "complexNames",
      "createUser",
    ]),
  },
  watch: {
    complexes: {
      handler(value) {
        if (value === "Без фильтра") {
          this.complexes = [];
          value = "";
        }
        this.sortObjectsByComplexes(value);
      },
      deep: true,
    },
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
