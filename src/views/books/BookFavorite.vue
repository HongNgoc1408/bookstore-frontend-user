<template>
    <div class="container">
        <h4 class="text-center mt-5">Sách yêu thích của tôi</h4>
        <div class="mt-5">
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
                const bookId = await FavoriteService.get(id);
                for (const id of bookId.bookId) {
                    const book = await BookService.get(id);
                    array.push(book);
                }
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
        }
    },
    created() {
        this.getBook(this.id);
        this.message = "";
    },
};
</script>