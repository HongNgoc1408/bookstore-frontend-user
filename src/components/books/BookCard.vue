<template>
    <div v-if="book" class="card p-0 rounded" style="width: 18rem; cursor:pointer;">
        <router-link :to="{ name: 'bookdetails', params: { id: book._id }, }">
            <img v-if="book.image" v-bind:src="book.image" class="card-img-top" alt="">
        </router-link>
        <div class="card-body d-flex flex-column border-top rounded" style="background-color: white">
            <h6 class="card-title">{{ book.name }}</h6>
            <p class="card-title"><strong>Tác giả: </strong>{{ book.author }}</p>
            <p class="card-title"><strong>Nhà xuất bản: </strong>{{ book.publisher }}</p>
            <p class="card-title"><strong>Năm xuất bản: </strong>{{ book.year }}</p>
            <p class="card-quantity" v-if="book.countInStock > 0"> <strong>Số lượng trong kho: </strong>{{
                book.countInStock }}</p>
            <div class="ms-auto">
                <router-link :to="{ name: 'bookdetails', params: { id: book._id }, }" class="btn btn-warning">Chi
                    tiết sách</router-link>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        book: { type: Object, required: true },
    },
};

</script>
<style scoped="scoped">
.card-body {
    max-height: 300px;
    overflow: auto;
}

.card-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
