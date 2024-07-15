<template>
  <v-file-input
    variant="outlined"
    :label="labelProp"
    :rules="rulesProp"
    hide-details
    v-model="model"
  >
  </v-file-input>
</template>

<script>
export default {
  name: "fileInput",
  props: {
    labelProp: String,
    placeholderProp: String,
    rulesProp: Array,
    typeProp: String,
  },
  data() {
    return {
      model: undefined,
    };
  },
  watch: {
    model(value) {
      this.$emit("update:modelValue", value || undefined);
    },
  },
};
</script>

<style scoped lang="scss">
.v-file-input {
  min-width: 400px;
  max-width: 400px;

  margin: 10px;
}
</style>
