<template>
  <div class="login">
    <p class="login-title">{{ title }}</p>
    <van-form @submit="onSubmit" class="form-wrap">
      <van-field
        v-model="state.username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="state.password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { defineComponent, ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

import { Toast } from "vant";
import { login } from "../api/index";
export default defineComponent({
  name: "login",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const title = ref("渐进式JavaScript 框架-登录");
    const state = reactive({
      username: "",
      password: ""
    });
    const onSubmit = async values => {
      try {
        Toast.loading({
          duration: 0,
          message: "加载中...",
          forbidClick: true
        });
        let result = await login(values);
        Toast.clear();
        if (result.code == 0) {
          store.commit("LOGIN", {
            data: result.data
          });
          Toast("登录成功");
          setTimeout(() => {
            const fullPath = route.query.fullPath || '/';
            router.replace({
                path: fullPath
            });
          }, 2000);
        }
      } catch (error) {}
    };
    return {
      title,
      state,
      onSubmit
    };
  }
});
</script>
<style lang="scss">
.login-title {
  color: #000;
  text-align: center;
  font-size: 32px;
  margin-top: 40px;
}
.form-wrap {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translate(0, -50%);
}
</style>