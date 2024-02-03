<template>
  <navbarComp :roleProp="user.role" :nameProp="user.name"></navbarComp>
  <main>
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
        labelProp="Имя"
        placeholderProp="Иванов Иван"
        v-model="name"
        :rulesProp="nameRules"></textField>
      <autocompleteField
        labelProp="Роль"
        placeholderProp="admin"
        v-model="role"
        :itemsProp="rolesName"
        :rulesProp="roleRules"></autocompleteField>
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

      login: "",
      password: "",
      name: "",
      role: "",

      loginRules: [(v) => v.length > 0 || "Введите логин"],
      passwordRules: [(v) => v.length > 0 || "Введите пароль"],
      nameRules: [(v) => v.length > 0 || "Введите имя"],
      roleRules: [(v) => v.length > 0 || "Выберите роль"],
    };
  },
  methods: {
    async checkValid(valid) {
      if (valid) {
        const user = {
          login: this.login,
          password: this.password,
          name: this.name,
          role: this.role,
        };
        await this.createUser(user);
        this.$router.push("/users");
      }
    },
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
    ...mapState(useUsersStore, ["rolesName", "createUser"]),
  },
};
</script>

<style scoped lang="scss"></style>
