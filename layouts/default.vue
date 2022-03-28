<template>
  <div>
    <transition-group name="nuxt">
      <Nuxt key="nuxt" />
      <Footer key="footer" />
    </transition-group>
  </div>
  
</template>

<style lang="scss" scoped>
.nuxt-enter-active, .nuxt-leave-active {
  transition: opacity .5s;
}
.nuxt-enter, .nuxt-leave-to {
  opacity: 0;
}
</style>