<template>
  <navbarComp :roleProp="user.role" :nameProp="user.name"></navbarComp>
  <main>
    <primaryRouterButton400 href="/createTech"> Добавить материал </primaryRouterButton400>
    <autocompleteField
      labelProp="Название материала"
      placeholderProp="Шифер"
      :itemsProp="techNames"
      v-model="autocompleteValue"></autocompleteField>
    <div class="cards">
      <techCard
        v-for="tech in sortTechByValue(autocompleteValue)"
        :key="tech.id"
        :tech="tech"></techCard>
    </div>
  </main>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "../store/UserStore";
import { useObjectsStore } from "../store/ObjectsStore";

export default {
  name: "UsersView",
  data() {
    return {
      autocompleteValue: undefined,
    };
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
    ...mapState(useObjectsStore, ["tech", "techNames", "sortTechByValue"]),
  },
};
</script>

<style scoped lang="scss">
</style>
../store/ObjectsStore