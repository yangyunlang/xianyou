<template>
  <el-form class="form" :model="form" :rules="rules">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="getCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="checkPassword">
      <el-input placeholder="确认密码" type="password" v-model="form.checkPassword"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="registerSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 验证规则
      rules: {
        username: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPassword: [{ validator: validatePass, trigger: "blur" }]
      },
      // 表单数据
      form: {
        username: "",
        captcha: "",
        nickname: "",
        password: "",
        checkPassword: ""
      }
    };
  },
  methods: {
    // 点击获取验证码
    getCaptcha() {
      if (!this.form.username) {
        this.$message.warning("请先输入手机号");
        return;
      }
      this.$axios({
        url: "/captchas",
        method: "POST",
        data: { tel: this.form.username }
      }).then(res => {
        // console.log(res);
        if (res.status == 200) {
          this.$alert(`模拟手机验证码为:${res.data.code}`, "提示", {
            type: "warning"
          });
        }
      });
    },
    // 实现注册功能
    registerSubmit() {
      var { checkPassword, ...formObj } = this.form;
      console.log(formObj);
      this.$axios({
        url: "/accounts/register",
        method: "POST",
        data: formObj
      }).then(res => {
        // console.log(res);
          this.$store.commit("user/setuserInfo", res.data);
          this.$message.success(" 注册成功，正在跳转页面")
          this.$router.push("/")
      });
    }
  }
};
</script>
<style lang="less" scoped>
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
