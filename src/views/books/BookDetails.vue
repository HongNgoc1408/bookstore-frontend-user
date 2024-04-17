<template>
    <div class="container">
        <h6 class="mb-3 text-primary">
            <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><router-link :to="{ name: 'bookstore' }" class="nav-link">
                            Trang chủ
                        </router-link></li>
                    <li class="breadcrumb-item active" aria-current="page">Sách</li>
                </ol>
            </nav>
        </h6>
        <div class="mt-5">
            <BookDetails v-if="book" :book="book" />
            <div v-else>
                <p>Không có thông tin sách.</p>
            </div>
        </div>
    </div>
</template>


<script>
import BookDetails from "@/components/books/BookDetails.vue";
import BookService from "@/services/book.service";

export default {
    components: {
        BookDetails,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            book: null,
        };
    },
    methods: {
        async getBook(id) {
            try {
                this.book = await BookService.get(id);
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
        this.getBook(this.id);
    },
};
</script>