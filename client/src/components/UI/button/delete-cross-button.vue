<template>
  <button>
    <div class="line"></div>
    <div class="line"></div>
  </button>
</template>

<script>
export default {
  name: "deleteCrossButton",
};
</script>

<style scoped lang="scss">
button {
    height: 40px;
    width: 40px;
    border-radius: 10px;
    background-color: #FF0000;

    position: relative;
    display: block;
}

button:hover {
    background-color: #fd3030;
}
.line {
    transform: translate(-50%, -50%) rotate(45deg);

    width: 30px;
    height: 5px;
    background-color: white;
    border-radius: 5px;

    position: absolute;
    left: 50%;
    top: 50%;
}

.line:nth-child(2) {
    transform: translate(-50%, -50%) rotate(135deg);
    transform-origin: 50%;
}
</style>
