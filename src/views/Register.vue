<template>
    <div class="container">
        <div class="card col-md-5 rounded">
            <div class="card-body">
                <h4 class="text-center">Đăng ký</h4>
                <div class="col mx-auto">
                    <FormRegister @submit:register="addUser" />
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import FormRegister from '@/components/FormRegister.vue';
import UserService from "@/services/user.service.js"

export default {
    components: {
        FormRegister
    },
    data() {
        return {
            newUser: {
                name: '',
                email: "",
                password: "",
            },
        };
    },
    methods: {
        async addUser(data) {
            try {
                await UserService.create(data);
                window.alert("Đăng ký thành công!")
                this.$router.push({ name: "login" });
            } catch (error) {
                console.log(error);
            }
        },
    },
}
</script>