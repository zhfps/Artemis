<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElNotification, type FormInstance, type FormRules } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { ipcRenderer } from 'electron'
import { useApp } from '@/store/modules/app'
import router from '@/router'


const app = useApp()

/** 登录表单元素的引用 */
const loginFormRef = ref<FormInstance | null>(null)

/** 登录按钮 Loading */
const loading = ref(false)
/** 登录表单数据 */
const loginFormData = reactive({
    username: 'gbsh@guwave.com',
    password: 'GB#SXY#sh00',
})
/** 登录表单校验规则 */
const loginFormRules: FormRules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
    ]
}
/** 登录逻辑 */
const handleLogin = () => {
    loginFormRef.value?.validate((valid: boolean, fields) => {
        if (valid) {
            //
            ipcRenderer.invoke('login-request',{name: loginFormData.username, password: loginFormData.password}).then((res:AuthenticationResult|null)  => {
                if(res){
                    //
                    const token = res.accessToken
                    //
                    app.setToken(token)
                    app.setName(loginFormData.username)
                    //
                    ipcRenderer.send('title',`itool | ${loginFormData.username.replace('@guwave.com','')}`)
                    router.push('/')
                }else{
                    ElNotification.error({
                    message: '登录失败,请检查密码和账号',
                    duration: 5000
                })
                }
            }).catch(() =>{
                ElNotification.error({
                    message: '登录失败,请检查密码和账号',
                    duration: 5000
                })
            })
        } else {
            console.error('表单校验不通过', fields)
        }
    })
}
</script>

<template>        
        <div class="login-container">
            <div class="login-card">
                <div class="title">
                    登录系统
                </div>
                <div class="content">
                    <el-form ref="loginFormRef" :model="loginFormData" :rules="loginFormRules" @keyup.enter="handleLogin">
                        <el-form-item prop="username">
                            <el-input v-model.trim="loginFormData.username" placeholder="用户名" type="text" tabindex="1"
                                :prefix-icon="User" size="large" />
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model.trim="loginFormData.password" placeholder="密码" type="password" tabindex="2"
                                :prefix-icon="Lock" size="large" show-password />
                        </el-form-item>
                        <el-button :loading="loading" type="primary" size="large" @click.prevent="handleLogin">登
                            录</el-button>
                    </el-form>
                </div>
            </div>
        </div>
        <!-- <NavBar class="move-left" /> -->
</template>

<style lang="scss" scoped>
.move-left{
  position: fixed;
  top: 0;
  right: 0;
}
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100%;
    background-color: #fff;

    .login-card {
        margin-top: 30%;
        transform: translateY(-50%);
        width: 480px;
        border-radius: 20px;
        // box-shadow: 0 0 10px #dcdfe6;
        background-color: #fff;
        overflow: hidden;

        .title {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 150px;

            img {
                height: 100%;
            }
        }

        .content {
            padding: 20px 50px 50px 50px;

            :deep(.el-input-group__append) {
                padding: 0;
                overflow: hidden;

                .el-image {
                    width: 100px;
                    height: 40px;
                    border-left: 0px;
                    user-select: none;
                    cursor: pointer;
                    text-align: center;
                }
            }

            .el-button {
                width: 100%;
                margin-top: 10px;
            }
        }
    }
}
</style>
