<template>
  <loader :isActive="isLoading"></loader>
  <RouterView></RouterView>
</template>

<script>
import { mapState } from "pinia";
import { useLoaderStore } from "./store/LoaderStore";
export default {
  computed: {
    ...mapState(useLoaderStore, ["isLoading"]),
  },
};
</script>
<style>
@import url(./styles/main.scss);
</style>
