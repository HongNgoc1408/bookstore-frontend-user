<template>
    <div class="container-xl px-4 mt-4">
        <div class="card flex flex-row">
            <div class="col-xl-4">
                <div class="mb-4 mb-xl-0">
                    <div class="card-header">Profile Picture</div>
                    <div class="card-body text-center">
                        <img class="img-thumbnail img-account-profile rounded-circle mb-2" :src="profileImage" alt="">
                    </div>
                </div>
            </div>
            <div class="col-xl-8">
                <div class="mb-4">
                    <div class="card-header">Account Details</div>
                    <div class="card-body">
                        <Form @submit.prevent="submitUser" :validation-schema="userFormSchema" class="my-form">
                            <div class="form-group mb-3">
                                <label for="email">E-mail</label>
                                <Field name="email" type="email" class="form-control" v-model="userLocal.email" />
                                <ErrorMessage name="email" class="error-feedback text-danger" />
                            </div>
                            <div class="row gx-3 mb-3">
                                <div class="form-group col-md-6">
                                    <label for="name">Tên</label>
                                    <Field name="name" type="text" class="form-control" v-model="userLocal.name" />
                                    <ErrorMessage name="name" class="error-feedback text-danger" />
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="gender">Giới tính</label>
                                    <select v-model="userLocal.gender" class="form-control">
                                        <option disabled value="">Giới tính</option>
                                        <option v-for="option in genderOption" :value="option.value"
                                            :key="option.value">{{ option.text }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="address">Địa chỉ</label>
                                <Field name="address" type="text" class="form-control" v-model="userLocal.address" />
                                <ErrorMessage name="address" class="error-feedback text-danger" />
                            </div>
                            <div class="form-group mb-3">
                                <label for="phone">Điện thoại</label>
                                <Field name="phone" type="tel" class="form-control" v-model="userLocal.phone" />
                                <ErrorMessage name="phone" class="error-feedback text-danger" />
                            </div>
                            <button class="btn btn-warning" type="submit" @click="submitUser">Lưu thay đổi</button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
    emits: ["submit:user", "delete:user"],
    props: {
        user: { type: Object, required: true }
    },
    data() {
        const userFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            email: yup
                .string()
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
            phone: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
            gender: yup
                .mixed()
                .oneOf([0, 1], "Giới tính phải có giá trị."),
        });

        return {
            userLocal: this.user,
            userFormSchema,
            genderOption: [
                { value: 0, text: 'Nữ' },
                { value: 1, text: 'Nam' }
            ],
        };
    },
    computed: {
        profileImage() {
            if (this.userLocal && this.userLocal.gender === 1) {
                return 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?';
            } else if (this.userLocal && this.userLocal.gender === 0) {
                return 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436178.jpg';
            } else {
                return 'https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg';
            }
        }
    },
    methods: {
        submitUser() {
            this.$emit("submit:user", this.userLocal);
        }
    },

};
</script>
