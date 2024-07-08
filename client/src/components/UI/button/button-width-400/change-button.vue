<template>
  <v-btn
    flat
    class="text-white text-none"
    color="green"
    min-height="60px"
    max-height="60px"
    min-width="400px"
    max-width="400px"
    :href="href"
    block>
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  name: "changeButton400",
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
