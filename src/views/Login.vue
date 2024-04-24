<template>
    <div class="container">
        <div class="card col-md-5 rounded">
            <div class="card-body">
                <h4 class="text-center">Đăng nhập</h4>
                <div class="col mx-auto">
                    <FormLogin @submit:login="loginUser" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import UserService from '@/services/user.service';
import FormLogin from "@/components/FormLogin.vue"

export default {
    components: {
        FormLogin
    },
    data() {
        return {
            newUser: {
                email: '',
                password: '',
            },
            message: "",
        };
    },
    methods: {
        async loginUser(data) {
            try {
                const user = await UserService.login(data.email, data.password);
                localStorage.setItem('userId', user._id);
                localStorage.setItem('userName', user.name);
                window.alert("Đăng nhập thành công!")
                window.location.href = "/";

                if (user._id) {
                    this.$router.replace({ name: 'bookstore' });
                }
            } catch (error) {
                window.alert("Đăng nhập không thành công!")
            }
        }
    },
}
</script>