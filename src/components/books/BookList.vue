<template>
    <div class="container">
        <div class="row">
            <div class="col-3" v-for="(book, index) in books" :key="book._id"
                :class="{ active: index === activeIndex }">
                <BookCard :book="book" />
            </div>
        </div>
    </div>
</template>

<script>
import BookCard from "@/components/books/BookCard.vue";

export default {
    components: {
        BookCard
    },
    props: {
        books: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
};
</script>
