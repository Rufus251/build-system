<template>
  <v-btn
    flat
    class="text-white text-none"
    color="green"
    min-height="60px"
    max-height="60px"
    min-width="200px"
    max-width="200px"
    :href="href"
    block>
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  name: "changeButton200",
  props: {
    href: String,
  },
};
</script>

<style scoped lang="scss">
.v-btn {
  margin: 10px;

  font-size: 24px;
}
</style>
