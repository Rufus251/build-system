<template>
  <button>
    <img src="/pencil.svg" alt="" />
  </button>
</template>

<script>
export default {
  name: "changePencilButton",
};
</script>

<style scoped lang="scss">
button {
  height: 40px;
  width: 40px;
  border-radius: 10px;
  color: white;
  background-color: rgb(0, 187, 0);

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

button:hover {
  background-color: green;
}

img {
  width: 30px;
  height: 30px;
}
</style>
