<template>
  <header>
    <div class="flex-container">
      <RouterLink to="/"><el-image :src="logo" /></RouterLink>
      <RouterLink class="entry" to="/">
        进入网站首页
        <i class="iconfont icon-angle-right"></i>
        <i class="iconfont icon-angle-right"></i>
      </RouterLink>
    </div>
  </header>

  <main class="login-container">
    <div class="wrapper">
      <h5>账户登录</h5>
      <div class="form-container">
        <el-form
          :model="form"
          :rules="rules"
          label-position="left"
          label-width="60px"
          ref="formRef"
        >
          <el-form-item label="账号" prop="account">
            <el-input v-model="form.account" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" show-password />
          </el-form-item>
          <el-form-item label-width="5px" prop="agree">
            <el-checkbox size="large" v-model="form.agree">
              我已同意隐私条款和服务条款
            </el-checkbox>
          </el-form-item>
          <el-button type="primary" size="large" class="btn" @click="handleSubmit"
            >点击登录</el-button
          >
        </el-form>
      </div>
    </div>
  </main>

  <LayoutFooter />
</template>

<script setup lang="ts">
import logo from '@/assets/images/logo.png'
import LayoutFooter from '@/components/LayoutFooter.vue'
import useUserStore from '@/stores/userStore'
import type { AxiosError } from 'axios'
import { type FormInstance } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

const form = ref({
  account: '',
  password: '',
  agree: false,
})

const validateAgree = (rule: any, value: any, callback: any) => {
  if (value) callback()
  else callback(new Error('勾选同意后再登录'))
}
const rules = {
  account: [
    { required: true, message: '账号不能为空', trigger: 'blur' },
    { min: 2, max: 10, message: '账号长度要求2~10个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 14, message: '密码长度要求6~14个字符', trigger: 'blur' },
  ],
  agree: [
    {
      validator: validateAgree,
      trigger: 'change',
    },
  ],
}

const formRef = ref<FormInstance>()
const router = useRouter()
const userStore = useUserStore()
const handleSubmit = () => {
  if (!formRef.value) return
  formRef.value.validate(async (valid) => {
    if (valid) {
      const { account, password } = form.value
      try {
        await userStore.getUserInfo({ account, password })
        ElMessage({ type: 'success', message: '登录成功' })
        // router.replace('/')
        router.back()
      } catch (e: unknown) {
        console.log(e)
        const error = e as AxiosError<{ message: string }>
        ElMessage({
          type: 'error',
          message: error.response?.data?.message || '登录失败，请稍后重试',
        })
      }
    } else {
      console.log('验证失败！')
    }
  })
}
</script>

<style scoped lang="scss">
header {
  width: 100%;
  position: sticky;
  top: 0px;
  z-index: 99;

  .flex-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;

    .el-image {
      width: 240px;
      vertical-align: top;
      margin-right: 20px;
    }

    .entry {
      font-size: 16px;
      color: $xtxColor;

      i {
        font-size: 14px;
        letter-spacing: -5px;
      }
    }
  }
}

.login-container {
  height: 400px;
  background: url('@/assets/images/login-bg.png') no-repeat center / cover;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 65%;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    h5 {
      font-size: 18px;
      font-weight: normal;
      line-height: 55px;
      text-align: center;
      margin-bottom: 25px;
      border-bottom: 1px solid #f5f5f5;
    }

    .form-container {
      padding: 0 20px 20px 20px;

      .el-form-item {
        margin-bottom: 20px;
      }

      .btn {
        width: 100%;
      }
    }
  }
}
</style>
