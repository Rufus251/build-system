<template>
  <router-link :to="href">
    <v-btn
      flat
      class="text-#696969 text-none"
      color="#B3B3B3"
      min-height="60px"
      max-height="60px"
      min-width="400px"
      max-width="400px"
      block
    >
      <slot></slot>
    </v-btn>
  </router-link>
</template>

<script>
export default {
  name: "primaryRouterButton400",
  props: {
    href: String,
  },
};
</script>

<style scoped lang="scss">
a {
  display: inline-block;
}
.v-btn {
  margin: 10px;

  font-size: 24px;
  font-weight: bold;
}
</style>
