<template>
  <div class="card">
    <div class="names">
      <h3> {{ tech.name }}</h3>
    </div>
    <div class="btns">
      <deleteButton400 @click="deleteTech(tech.id)"> Удалить </deleteButton400>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useTechnicalStore } from "../../store/TechnicalStore";

export default {
  name: "techCard",
  props: {
    tech: Object,
  },
  computed: {
    ...mapState(useTechnicalStore, ["deleteTech"]),
  },
};
</script>

<style scoped lang="scss">
.card {
  padding: 15px;
  margin: 10px;

  border: 1px solid black;
  border-radius: 15px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
