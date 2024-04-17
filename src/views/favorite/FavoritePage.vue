<template>
    <div class="container">
        <h6 class="mb-3 text-primary">
            <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><router-link :to="{ name: 'bookstore' }" class="nav-link">
                            Trang chủ
                        </router-link></li>
                    <li class="breadcrumb-item active" aria-current="page">Sách yêu thích của tôi</li>
                </ol>
            </nav>
        </h6>
        <h4 class="text-center mt-5">Sách yêu thích của tôi</h4>
        <div class="row">
            <FavoriteList :favorites="favorite" />
        </div>
    </div>
</template>


<script>
import FavoriteList from "@/components/favorite/FavoriteList.vue";
import FavoriteService from "@/services/favorite.service";
import BookService from "@/services/book.service";

export default {
    components: {
        FavoriteList,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            favorite: [],
            message: "",
        };
    },
    methods: {
        async getBook(id) {
            const array = [];
            try {
                // console.log(id);
                const bookId = await FavoriteService.get(id);
                console.log(bookId);
                for (const id of bookId.bookId) {
                    console.log(id);
                    const book = await BookService.get(id);
                    array.push(book);
                    // console.log(array.push(book));
                }
                // console.log(array)
                this.favorite = array;
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
    },
    created() {
        this.getBook(this.id);
        this.message = "";
    },
};
</script>