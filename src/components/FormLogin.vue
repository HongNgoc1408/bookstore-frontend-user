<template>
    <Form @submit="submitLogin" :validation-schema="loginFormSchema" class="form-login">

        <div class="mb-3">
            <label for="email">Email</label>
            <Field type="email" name="email" class="form-control" placeholder="you@example.com"
                v-model="loginLocal.email" />
            <ErrorMessage name="email" class="error-feedback text-danger" />
        </div>

        <div class="mb-3">
            <label for="password">Mật khẩu</label>
            <Field type="password" name="password" class="form-control" placeholder="Password"
                v-model="loginLocal.password" />
            <ErrorMessage name="password" class="error-feedback text-danger" />
        </div>

        <div class="checkbox mb-3">
            <label>
                <input type="checkbox" checked v-model="loginLocal.rememberMe"> Remember me
            </label>
        </div>
        <div class="form-group d-flex justify-content-center my-3">
            <button class="col btn btn-warning text-dark" type="submit"> Đăng nhập
            </button>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-6">Bạn chưa có tài khoản ?</div>
            <div class="col-md-6 text-end">
                <router-link to="/register" class="nav-link text-primary">Đăng ký</router-link>
            </div>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            loginLocal: {
                email: "",
                password: "",
                rememberMe: false,
            },
            loginFormSchema: yup.object().shape({
                email: yup.string().email("Email không hợp lệ.").required("Vui lòng nhập Email."),
                password: yup.string().required("Vui lòng nhập mật khẩu."),
            }),
        };
    },
    methods: {
        submitLogin() {
            this.$emit("submit:login", this.loginLocal);
        }
    },
}
</script>

<style scoped></style>