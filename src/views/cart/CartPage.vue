<template>
    <div class="container">
        <div class="my-5">
            <CartList :products="cart" />
        </div>
    </div>
</template>


<script>
import CartList from "@/components/cart/CartList.vue";
import CartService from "@/services/cart.service";
import BookService from "@/services/book.service";
export default {
    components: {
        CartList,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            cart: [],
        };
    },
    methods: {
        async getProduct(id) {
            const array = [];
            try {
                const data = await CartService.get(id);
                console.log(data)
                for (const id of data) {
                    console.log(id.bookId)
                    const product = await BookService.get(id.bookId);
                    product.quantity = id.quantity;
                    array.push(product);
                }

                this.cart = array;
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
        this.getProduct(this.id);
    },
};
</script>