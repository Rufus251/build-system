<template>
  <div class="sort">
    <autocompleteField
      labelProp="Жилые комплексы"
      :itemsProp="['Без фильтра', ...complexSelects]"
      v-model="complexes"
    ></autocompleteField>
    <autocompleteField
      labelProp="Объекты"
      :itemsProp="['Без фильтра', ...objectSelects]"
      v-model="objects"
    ></autocompleteField>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useObjectsStore } from "../../store/ObjectsStore";

export default {
  name: "objectSort",
  props: {
    complexSelects: Array,
    objectSelects: Array,
  },
  data() {
    return {
      complexes: null,
      objects: null,
    };
  },
  computed: {
    ...mapState(useObjectsStore, ["fetchUsersWithParams"]),
  },
  watch: {
    complexes: {
      handler(value) {
        if (value === "Без фильтра") {
          this.complexes = null;
          value = "";
        }
        this.$emit("update:complexes", value || []);
      },
      deep: true,
    },
    objects: {
      handler(value) {
        if (value === "Без фильтра") {
          this.objects = null;
          value = "";
        }
        this.$emit("update:objects", value || []);
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">
.sort {
  max-height: 213px;

  border: 3px solid black;
  border-radius: 15px;

  padding: 20px;
  margin: 10px;

  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
