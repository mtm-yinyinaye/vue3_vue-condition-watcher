<template>
  <router-view></router-view>
</template>

<script>
const cache = new Map()
export default {
  provide: {
    cacheProvider: () => cache
  }
}

</script>

<style scoped>
</style>
