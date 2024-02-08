<template>
  <router-link :to="href">
    <v-btn
      flat
      class="text-white text-none"
      color="#3d8be4"
      min-height="60px"
      max-height="60px"
      min-width="200px"
      max-width="200px"
      block>
      <slot></slot>
    </v-btn>
  </router-link>
</template>

<script>
export default {
  name: "primaryRouterButton200",
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
