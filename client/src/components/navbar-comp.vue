<template>
  <nav>
    <ul>
      <li>
        <router-link to="/main"> Главная </router-link>
      </li>
      <li v-if="roleProp === 'admin'">
        <router-link to="/users"> Пользователи </router-link>
      </li>
      <li v-if="roleProp === 'admin' || roleProp === 'manager'">
        <router-link to="/technical"> Технический </router-link>
      </li>
      <li v-if="roleProp === 'admin' || roleProp === 'manager'">
        <router-link to="/reports"> Все отчёты </router-link>
      </li>
      <li v-if="roleProp === 'user'">
        <router-link to="/myReports"> Мои отчёты </router-link>
      </li>
    </ul>
    <div class="signOut">
      <p v-if="roleProp">{{ nameProp }}</p> 
      <deleteRouterButton200 href="/auth" @click="signOut()"> Выйти </deleteRouterButton200>
    </div>
  </nav>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "../store/UserStore";

export default {
  name: "navbarComp",
  props: {
    roleProp: String,
    nameProp: String,
  },
  data() {
    return {
      model: undefined,
    };
  },
  computed: {
    ...mapState(useUserStore, ["signOut"]),
  },
};
</script>

<style scoped lang="scss">
nav {
  width: 100%;
  height: 80px;

  padding-left: 40px;
  padding-right: 40px;

  background-color: #5ea0ea;

  display: flex;
  align-items: center;
  justify-content: space-between;
}
ul {
  list-style: none;

  display: flex;
  align-items: center;
  gap: 50px;
}
ul li a {
  color: white;
  font-size: 24px;
  font-weight: bold;
}
ul li:first-child a {
  font-size: 36px;
}
.signOut{
  display: flex;
  gap: 40px;
  align-items: center;
}
nav p {
  color: white;
}
</style>
