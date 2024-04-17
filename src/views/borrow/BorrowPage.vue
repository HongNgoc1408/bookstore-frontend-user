<template>
    <div class="container">
        <h6 class="mb-3 text-primary">
            <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><router-link :to="{ name: 'bookstore' }" class="nav-link">
                            Trang chủ
                        </router-link></li>
                    <li class="breadcrumb-item active" aria-current="page">Lịch sử mượn sách</li>
                </ol>
            </nav>
        </h6>
        <h4 class="text-center">Lịch sử mượn sách</h4>
        <div class="col-md-6 mx-auto">
            <BorrowList :borrows="borrow" />
        </div>
    </div>
</template>


<script>
import BorrowList from "@/components/borrow/BorrowList.vue";
import BorrowService from "@/services/borrow.service";
import { array } from "yup";

export default {
    components: {
        BorrowList,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            borrow: [],
        };
    },
    methods: {
        async getBorrow(id) {
            try {
                const user = await BorrowService.getAll();
                const array = [];
                for (const index of user) {
                    if (id == index.userId) {
                        array.push(index);
                    }
                }
                this.borrow = array;
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
        }
    },
    created() {
        this.getBorrow(this.id);
    },
};
</script>

<style scoped>
.page {
    text-align: left;
    max-width: 100px;
}
</style>