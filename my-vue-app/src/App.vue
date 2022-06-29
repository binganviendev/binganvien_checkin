<template>
  <router-view />
</template>
<script setup>
import { ref } from 'vue';

const year = ref(2022);
year.value = (new Date()).getFullYear();

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.w-100px {
  width: 100px;
}
.w-full {
  width: 100%;
}
* {
  font-family: Futura !important;
}
.footer-rights {
  display: block;
  width: 100%;
  position: absolute;
  bottom: 1rem;
  font-size: 0.6rem;
  color: #fff;
}
@font-face {
  font-family: Futara;
  src: url("@/assets/fonts/Futura Light font.ttf");
}
</style>
