<template>
  <div>
    <img src="../assets/img/logo.png" alt="" />
    <p class="title">{{ title }}</p>
    <van-button type="success">成功按钮</van-button>
    <img src="../assets/img/test.jpg" alt="">
  </div>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue";
import { user } from "../api/index";
export default defineComponent({
  name: "index",

  setup() {
    const title = ref("渐进式JavaScript 框架-首页1");
    onMounted(() => {
      user();
      console.log("mounted!");
    });

    return {
      title
    };
  }
});
</script>
<style lang="scss" scoped>
.title {
  color: #000;
  font-size: 48px;
  text-align: center;
}
img {
  max-width: 100%;
}
.van-button{
margin-bottom: 20px;}
</style>