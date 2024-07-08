<template>
  <div class="card">
    <div class="names">
      <h3>Логин: {{ user.login }}</h3>
      <h3>Имя: {{ user.name }}</h3>
      <h3>Роль: {{ user.role }}</h3>
      <h3>Должность: {{ user.position }}</h3>
    </div>
    <div class="btns">
      <primaryRouterButton400 :href="`/editUser/${user.id}`">
        Изменить
      </primaryRouterButton400>
      <deleteButton400 @click="deleteUser(user.id)"> Удалить </deleteButton400>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useUsersStore } from "../../store/UsersStore";

export default {
  name: "userCard",
  props: {
    user: Object,
  },
  computed: {
    ...mapState(useUsersStore, ["deleteUser"]),
  },
};
</script>

<style scoped lang="scss">
.card {
  padding: 15px;
  margin: 10px;

  border: 3px solid black;
  border-radius: 15px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
