  
<template>
  <div id="app">
    <div id="nav" v-if="!$route.meta.hide">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" class="router"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" class="router"></router-view>
  </div>
</template>
<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const store = useStore();
    return {
        title: computed(() => store.state.title)
    };
  }
});
</script>
<style lang="scss">
@import "style/_variables.scss";
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
#nav {
  padding: 20px 0;
    a {
        font-weight: bold;
        color: #2c3e50;
        font-size: 32px;
        &.router-link-exact-active {
            color: $color-main;
        }
    }
}
h3 {
    font-size: 18px;
}
a {
}
</style>