<template>
  <main class="c-main">
    <slot></slot>
    <div>e</div>
  </main>
</template>

<script>
export default {
  name: "CMain"
}
</script>

<style lang="scss" scoped>
  @include b(c-main){
    overflow: auto;
    flex: 1;
  }

</style>
