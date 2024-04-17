<template>
    <Form @submit="submitBook" :validation-schema="bookFormSchema">
        <div class="form-group">
            <label for="image"><strong>Ảnh</strong></label>
            <Field name="image" type="text" class="form-control" v-model="bookLocal.image" />
            <ErrorMessage name="image" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="name"><strong>Tên</strong></label>
            <Field name="name" type="text" class="form-control" v-model="bookLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="price"><strong>Giá</strong></label>
            <Field name="price" type="text" class="form-control" v-model="bookLocal.price" />
            <ErrorMessage name="price" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="NXB"> <strong>Tác giả</strong></label>
            <Field name="author" type="text" class="form-control" v-model="bookLocal.author" />
            <ErrorMessage name="author" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="description"><strong>Mô tả</strong></label>
            <textarea name="description" type="text" class="form-control" v-model="bookLocal.description"
                rows="5"></textarea>
            <ErrorMessage name="description" class="error-feedback" />
        </div>

        <div class="form-group form-check">
            <input name="favorite" type="checkbox" class="form-check-input" v-model="bookLocal.favorite" />
            <label for="favorite" class="form-check-label">
                <strong> Sách yêu thích</strong>
            </label>
        </div>
        <div class="form-group">
            <button class="btn btn-primary form-control" @click="submitBook">
                <i class="fas fa-save"></i> Lưu
            </button>
        </div>
        <div class="form-group">
            <button v-if="bookLocal._id" type="button" class="m-1 btn btn-danger" @click="deleteBook">
                Xóa
            </button>
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
    emits: ["submit:book", "delete:book"],
    props: {
        book: { type: Object, required: true }
    },
    data() {
        const bookFormSchema = yup.object().shape({
            image: yup
                .string()
                .required("Ảnh phải có giá trị."),
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            price: yup
                .string()
                .required("Giá phải có giá trị"),
            author: yup
                .string()
                .required("Tác giả phải có giá trị"),
        });
        return {
            bookLocal: this.book,
            bookFormSchema,
        };
    },
    methods: {
        submitBook() {
            this.$emit("submit:book", this.bookLocal);
        },
        deleteBook() {
            this.$emit("delete:book", this.bookLocal.id);
        },
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>