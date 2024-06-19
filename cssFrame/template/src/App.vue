<script>
import {onMounted} from 'vue'
export default {
  setup() {
    onMounted(() =>{
      window.document.documentElement.setAttribute(
          "data-theme",
          "cool"
      );
    })
  }
}
</script>
<template>
  <div class="t-theme-box" circle>aaa</div>
  <div class="t-theme-text" circle>aaa</div>
  <div class="hello" circle>aaa</div>
  <div class="hello" circle>aaa</div>
  <div class="hello" circle>aaa</div>
</template>

<style lang="scss" scoped>
.hello{
  width:100px;
  height: 100px;
  color: $color-primary;
  background: black;
}
</style>
