<template>
    <Form @submit="submitRegister" :validation-schema="registerFormSchema" class="register-form">
        <div class="form-group">
            <label for="name">Họ tên</label>
            <Field name="name" type="text" class="form-control" v-model="registerLocal.name" />
            <ErrorMessage name="name" class="error-feedback text-danger" />
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <Field name="email" type="email" class="form-control" v-model="registerLocal.email" />
            <ErrorMessage name="email" class="error-feedback text-danger" />
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="password" class="form-control" v-model="registerLocal.password" />
            <ErrorMessage name="password" class="error-feedback text-danger" />
        </div>
        <div class="form-group">
            <label for="confirmPassword">Xác nhận mật khẩu</label>
            <Field name="confirmPassword" type="password" class="form-control"
                v-model="registerLocal.confirmPassword" />
            <ErrorMessage name="confirmPassword" class="error-feedback text-danger" />
        </div>
        <div class="form-group">
            <label for="phone">Số điện thoại</label>
            <Field name="phone" type="tel" class="form-control" v-model="registerLocal.phone" />
            <ErrorMessage name="phone" class="error-feedback text-danger" />
        </div>

        <div class="form-group d-flex justify-content-center my-3">
            <button class="col btn btn-warning text-dark" type="submit"> Đăng ký
            </button>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-6">Bạn đã có tài khoản ?</div>
            <div class="col-md-6 text-end">
                <router-link to="/login" class="nav-link text-primary">Đăng nhập</router-link>
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
            registerLocal: {
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                phone: "",
            },
            registerFormSchema: yup.object().shape({
                name: yup.string().required("Vui lòng nhập họ tên."),
                email: yup.string().email("Email không hợp lệ.").required("Vui lòng nhập Email."),
                password: yup.string().required("Vui lòng nhập mật khẩu."),
                confirmPassword: yup
                    .string().oneOf([yup.ref("password"), null],)
                    .required("Mật khẩu xác nhận không trùng khớp."),
                phone: yup.string().required("Vui lòng nhập số điện thoại."),
            }),
        };
    },
    methods: {
        submitRegister() {
            this.$emit("submit:register", this.registerLocal);
        }
    },
};
</script>

<style scoped>
.register-form .form-group {
    margin-bottom: 20px;
}
</style>