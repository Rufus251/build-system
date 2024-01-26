<template>
  <v-textarea
    variant="outlined"
    :label="labelProp"
    :placeholder="placeholderProp"
    hide-details
    auto-grow
    v-model="model"
  >
  </v-textarea>
</template>

<script>
export default {
  name: "textareaField",
  props: {
    labelProp: String,
    placeholderProp: String,
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
.v-text-field {
  min-width: 400px;
  max-width: 400px;

  margin: 10px;
}
</style>
