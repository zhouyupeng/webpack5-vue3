<template>
  <div class="about">
    <p class="title">{{ title }}</p>
    <h1>用户名:{{ user.name }}</h1>
    <img :src="user.portrait" alt />
    <h3>token:{{ token }}</h3>
    <h3>{{$filters.formatTimers(1555851774,true)}}</h3>
    <input type="text" value="1212" />
    <div class="bg">bg111111</div>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "index",
  setup() {
    const store = useStore();
    const title = ref("渐进式JavaScript 框架-about");
    onMounted(() => {
      console.log("mounted!");
    });
    return {
      title,
      token: computed(() => store.state.token),
      user: computed(() => store.state.user)
    };
  }
});
</script>
<style lang="scss">
.title {
  text-align: center;
  margin-top: 40px;
  font-size: 32px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

h1 {
  font-size: 36px;
}
.msg {
  text-align: center;
  font-size: 32px;
}
.bg{
  color: #000;
  background-image: url(img/logo.png);
  background-size: contain;
  font-size: 32px;
}
</style>