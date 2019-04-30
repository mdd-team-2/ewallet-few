<template>
  <div>
    <div>
      {{ message }}
    </div>
    <router-view tag="div"></router-view>
  </div>
</template>
<script>
export default {
  data: () => ({
    message: 'Este es el componente de DASHBOARD'
  })
}
</script>
<style scoped>

</style>
