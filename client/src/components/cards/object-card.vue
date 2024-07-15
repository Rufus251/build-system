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
import { useObjectsStore } from "../../store/ObjectsStore";

export default {
  name: "objectCard",
  props: {
    tech: Object,
  },
  computed: {
    ...mapState(useObjectsStore, ["deleteTech"]),
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
../../store/ObjectsStore