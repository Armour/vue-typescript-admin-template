<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
        <lang-select class="set-language" />
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon name="user" />
        </span>
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="$t('login.username')" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon name="password" />
        </span>
        <el-input
          v-model="loginForm.password"
          :type="passwordType"
          :placeholder="$t('login.password')"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :name="passwordType === 'password' ? 'eye-off' : 'eye-on'" />
        </span>
      </el-form-item>
      <el-form-item>
        
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          {{ $t('login.logIn') }}
        </el-button>
      </el-form-item>
      <div style="position:relative">
        <div class="tips">
          <span>{{ $t('login.username') }} : admin</span>
          <span>{{ $t('login.password') }} : {{ $t('login.any') }}</span>
        </div>
        <div class="tips">
          <span style="margin-right:18px;">
            {{ $t('login.username') }} : editor
          </span>
          <span>{{ $t('login.password') }} : {{ $t('login.any') }}</span>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import LangSelect from '@/components/LangSelect/index.vue';
import { isValidUsername } from '@/utils/validate';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { UserModule } from '@/store/modules/user';
import { Route } from 'vue-router';
import { ElForm } from 'element-ui/types/form';

const validateUsername = (rule: any, value: string, callback: any) => {
  if (!isValidUsername(value)) {
    callback(new Error('请输入正确的用户名'));
  } else {
    callback();
  }
};
const validatePassword = (rule: any, value: string, callback: any) => {
  if (value.length < 5) {
    callback(new Error('密码不能小于5位'));
  } else {
    callback();
  }
};

@Component({
  components: { LangSelect },
})
export default class Login extends Vue {
  private loginForm = {
    username: 'admin',
    password: 'admin',
  };
  private loginRules = {
    username: [{ required: true, trigger: 'blur', validator: validateUsername }],
    password: [{ required: true, trigger: 'blur', validator: validatePassword }],
  };
  private loading = false;
  private passwordType = 'password';
  private redirect: string | undefined = undefined;

  @Watch('$route', { immediate: true })
  private OnRouteChange (route: Route) {
    // TODO: remove the "as string" hack after v4 release for vue-router
    // See https://github.com/vuejs/vue-router/pull/2050 for details
    this.redirect = route.query && route.query.redirect as string;
  }

  private showPwd () {
    if (this.passwordType === 'password') {
      this.passwordType = '';
    } else {
      this.passwordType = 'password';
    }
  }

  private handleLogin () {
    (this.$refs.loginForm as ElForm).validate((valid: boolean) => {
      if (valid) {
        this.loading = true;
        UserModule.Login(this.loginForm).then(() => {
          this.loading = false;
          this.$router.push({ path: this.redirect || '/' });
        }).catch(() => {
          this.loading = false;
        });
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }
}
</script>

<style lang="scss">
@import "src/styles/variables.scss";

.login-container {
  .el-input {
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      color: $lightGray;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
@import "src/styles/variables.scss";

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $loginBg;

  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }

  .el-input {
    display: inline-block;
    width: 85%;
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $darkGray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title {
    font-size: 26px;
    font-weight: 400;
    color: $lightGray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
