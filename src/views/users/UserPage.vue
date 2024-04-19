<template>
    <div class="container">
        <h4 class="text-center">Hồ sơ của tôi</h4>
        <div class="mx-auto">
            <UserForm :user="user" @submit:user="updateUser" />
        </div>
    </div>
</template>


<script>
import UserForm from "@/components/users/UserForm.vue";
import UserService from "@/services/user.service";

export default {
    components: {
        UserForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            user: null,
            message: "",
        };
    },
    methods: {
        async getUser(id) {
            try {
                this.user = await UserService.get(id);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateUser(data) {
            try {
                await UserService.update(this.user._id, data);
                window.alert("Thông tin đã được thay đổi")
                this.$router.push({ name: "bookstore"});
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getUser(this.id);
        this.message = "";
    },
};
</script>