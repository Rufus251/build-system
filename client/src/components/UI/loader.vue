<template>
  <div class="loaderBg" v-if="isActive">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: "loader",
  props: {
    isActive: Boolean
  }
};
</script>

<style scoped>
.loaderBg {
  z-index: 10;
  width: 100vw;
  height: 100vh;

  position: fixed;

  background-color: rgba(0.5, 0.5, 0.5, 0.2);
}
.loader {
  z-index: 10;
  top: calc(50% - 100px);
  left: calc(50% - 100px);

  width: 200px;
  height: 200px;

  position: absolute;

  border: 30px dashed #cb3535;
  border-radius: 50%;

  /* animation: name duration timing-function delay iteration-count direction fill-mode; */
  animation-name: loader;
  animation-duration: 3s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  
}

@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
