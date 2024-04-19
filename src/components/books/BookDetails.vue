<template>
    <div class="row d-flex justify-content-center">
        <div class="col-md-10">
            <h4 class="text-center">Chi tiết sách</h4>
            <div class="card">
                <div class="row">
                    <div class="col-md-5">
                        <div class="mt-5">
                            <div class="text-center">
                                <img :src="bookLocal.image" width="350" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-7">
                        <div class="book p-4">
                            <div class="mt-4 mb-3">
                                <h5 class="text-uppercase mb-3">{{ bookLocal.name }}</h5>
                                <div class="price d-flex flex-row align-items-center">
                                    <p><strong>Tác giả: </strong><span>{{ bookLocal.author }}</span></p>
                                </div>
                                <div class="price d-flex flex-row align-items-center">
                                    <p><strong>Nhà xuất bản: </strong><span>{{ bookLocal.publisher }}</span></p>
                                </div>
                                <div class="price d-flex flex-row align-items-center">
                                    <p><strong>Năm xuất bản: </strong><span>{{ bookLocal.year }}</span></p>
                                </div>
                                <div class="price d-flex flex-row align-items-center">
                                    <p><strong>Thể loại: </strong> <span>{{ bookLocal.type }}</span></p>
                                </div>
                                <div class="price d-flex flex-row align-items-center">
                                    <p>
                                        <strong>Số lượng trong kho: </strong> <span>{{ bookLocal.countInStock }}</span>
                                    </p>
                                </div>
                            </div>
                            <h6><strong>Mô tả:</strong></h6>
                            <p class="about">{{ bookLocal.description }}</p>
                            <div class="quantity-control mb-3">
                                <button class="col-auto btn btn-icon btn-outline-warning text-dark"
                                    @click="decreaseQuantity">
                                    <i class="fa fa-minus"></i>
                                </button>
                                <span class="mx-3 my-3 p-2">
                                    <input
                                        class="d-inline-flex focus-ring focus-ring-warning py-1 px-2 text-decoration-none border rounded-2"
                                        type="number" id="quantity" name="quantity" v-model="quantity">
                                </span>
                                <!-- <span class="mx-2">{{quantity}}</span> -->
                                <button class="col-auto btn btn-icon btn-outline-warning text-dark"
                                    @click="increaseQuantity">
                                    <i class="fa fa-plus"></i>
                                </button>

                            </div>
                            <div v-if="userId" class="cart align-items-center">
                                <button class="my-2 btn btn-outline-warning text-dark text-uppercase mr-2 px-4 mx-1"
                                    @click="addToCart">
                                    Thêm vào giỏ hàng
                                </button>
                                <router-link :to="{ name: 'cartpage', params: { id: userId } }"
                                    class="my-2 btn btn-outline-warning text-dark text-uppercase mr-2 px-4 mx-1">
                                    Đi vào mượn sách
                                </router-link>
                                <i class="my-2 fa fa-heart ms-3 me-3 fs-3"
                                    :class="{ 'text-muted': !check, 'text-danger': check }" @click="changeFavorite"></i>
                                <i class="my-2 fa fa-share-alt fs-3 text-primary"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Form } from "vee-validate";
import CartService from "@/services/cart.service.js"
import FavoriteService from "@/services/favorite.service";

export default {
    components: {
        Form,
    },
    props: {
        book: { type: Object, required: true }
    },
    data() {
        return {
            userId: '',
            bookLocal: this.book,
            check: false,
            quantity: 1,
        };
    },
    async mounted() {
        await this.getUserFromLocalStorage();
        await this.checkFavorite();
    },
    methods: {
        async checkFavorite() {
            const id = localStorage.getItem("userId");
            if (!id) return;
            const userFavorites = await FavoriteService.get(id);
            this.check = userFavorites.bookId.includes(this.book._id);
            // console.log(this.check);
        },
        async changeFavorite() {
            const id = localStorage.getItem("userId");
            if (!id) {
                this.$router.push({ name: 'login' });
                return;
            }
            const bookId = this.book._id;
            const userFavorites = await FavoriteService.get(id);
            const check = userFavorites.bookId.includes(this.book._id);

            if (check === true) {
                await FavoriteService.delete(id, bookId);
            } else {
                await FavoriteService.add(id, bookId);
            }
            await this.checkFavorite();
        },
        async getUserFromLocalStorage() {
            const userId = localStorage.getItem('userId');
            if (userId) {
                this.userId = userId;
                await this.checkFavorite();
            }
        },
        async addToCart() {
            const quantity = this.quantity;
            const userId = localStorage.getItem("userId");
            if (!userId) {
                this.$router.push({ name: 'login' });
                return;
            }
            const bookId = this.book._id;
            const countInStock = this.bookLocal.countInStock;

            if (quantity < 1) {
                alert("Số lượng phải lớn hơn 0.");
                return;
            } else if (quantity > countInStock) {
                alert("Số lượng vượt quá số lượng trong kho.");
                return;
            }
            const books = [{ bookId, quantity }];
            const cartData = { userId, books };

            try {
                const check = await CartService.add(cartData);
                // console.log(cartData);
                if (check) {
                    alert("Thêm vào giỏ hàng thành công!");
                }
            } catch (error) {
                console.error("Lỗi khi thêm vào giỏ hàng:", error);
                alert("Đã xảy ra lỗi khi thêm vào giỏ hàng. Vui lòng thử lại sau!");
            }
        },




        increaseQuantity() {
            if (this.quantity < this.bookLocal.countInStock) {
                this.quantity++;
            }
        },

        decreaseQuantity() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        }
    },
};
</script>
