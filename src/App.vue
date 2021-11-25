<template>
  <div id="app">
    <transition>
    <router-view/>
    </transition>
  </div>
</template>



<style>
.v-enter-active, .v-leave-active {
  transition: all .8s;
  left: 0;
}
.v-enter, .v-leave-to {
  opacity: 0;
  left: -100%;
}


</style>
