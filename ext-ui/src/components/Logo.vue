<template>
  <div class="img-logo">
    <img :src="imageData" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import { Api } from "../Utils/Tools";

const props = defineProps({
  src: {
    type: String,
    require: true,
  },
});

const imageData = ref();

onMounted(() => {
  Api.postMsg("getImage", {
    src: props.src,
  });

  Api.listenMsg(props.src!, (data) => {
    imageData.value = data;
  });
});

onUnmounted(() => {
  imageData.value = "";
});
</script>

<style lang="scss">
.img-logo {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: antiquewhite;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  box-sizing: border-box;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
