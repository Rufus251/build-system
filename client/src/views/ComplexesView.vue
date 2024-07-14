<template>
  <navbarComp :roleProp="user.role" :nameProp="user.name"></navbarComp>
  <div class="createButton">
    <primaryRouterButton400 href="/createComplex">
      Добавить комплекс
    </primaryRouterButton400>
  </div>
  <main>
    <div class="cards">
      <complexCard
        v-for="complex in this.sortedComplexes"
        :key="complex.id"
        :complex="complex"
      ></complexCard>
    </div>
    <complexSort
      class="sort"
      :complexNames="['Без сортировки', ...complexNames]"
      v-model:complexName="complexName"
    ></complexSort>
  </main>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "../store/UserStore";
import { useComplexesStore } from "../store/ComplexesStore";

export default {
  name: "ComplexesView",
  data() {
    return {
      complexName: null,
    };
  },
  async mounted() {
    await this.fetchAllComplexes();
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
    ...mapState(useComplexesStore, ["fetchAllComplexes", "sortedComplexes", "complexNames", "sortComplexesByName"]),
  },
  watch: {
    complexName: {
      handler(value) {
        this.sortComplexesByName(value);
      },
    },
  },
};
</script>

<style scoped lang="scss">
main {
  display: flex;
  justify-content: space-between;
}
.cards {
  min-width: 1200px;
}
</style>
../store/ComplexesStore