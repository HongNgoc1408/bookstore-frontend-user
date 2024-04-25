<template>
    <div class="col">
        <div class="card rounded">
            <div class="card-body p-4">
                <div class="row">
                    <div class="col-lg-7">
                        <h6 class="mb-3 text-primary">
                            <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><router-link :to="{ name: 'bookstore' }"
                                            class="nav-link">
                                            Home
                                        </router-link></li>
                                    <li class="breadcrumb-item active" aria-current="page">Cart</li>
                                </ol>
                            </nav>
                        </h6>
                        <hr>
                        <h4 class="text-center mt-5">Giỏ hàng của tôi</h4>
                        <div v-if="products.length === 0" class="text-center my-5">
                            <img src="../../assets/cart-empty.webp" alt="">
                        </div>

                        <div v-else>
                            <div v-for="(product, index) in products" :key="product._id"
                                :class="{ active: index === activeIndex }" class="border">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between">
                                        <div class="d-flex flex-row align-items-center">
                                            <div>
                                                <img :src="product.image" class="img-fluid rounded-3 d-none d-sm-block"
                                                    alt="Shopping item" style="width: 65px;" />
                                            </div>
                                            <div class="ms-3">
                                                <h6><router-link :to="'/books/' + product._id"
                                                        class="text-black link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                                                        {{ product.name }}
                                                    </router-link>
                                                </h6>
                                                <p class="small mb-0">{{ product.author }}</p>
                                            </div>
                                        </div>
                                        <div class="d-flex flex-row align-items-center justify-content-between">
                                            <h6 class="fw-normal mb-0 mx-3">SL: {{ product.quantity }}</h6>
                                            <button class="btn ml-3 btn-danger" @click="deleteProduct(product._id)">
                                                <i class="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Thông tin giỏ hàng -->
                    <div class="col-lg-5 my-2">
                        <div class="rounded-3 my-5">
                            <div class="card-body">
                                <div class="text-center  justify-content-between align-items-center mb-4">
                                    <h4 class="mb-0">Chi tiết mượn sách</h4>
                                </div>
                                <form class="mt-4" @submit.prevent="submitForm">
                                    <div>
                                        <div class="form-group mb-4 d-none">
                                            <label for="userId" class="form-label">User ID</label>
                                            <input type="text" id="userId" class="form-control form-control"
                                                v-model="userId">
                                        </div>
                                        <div class="form-group mb-4">
                                            <label for="name" class="form-label"><strong>Tên người mượn</strong></label>
                                            <input type="text" id="name" class="form-control form-control"
                                                v-model="name">
                                        </div>
                                        <div class="form-group mb-4">
                                            <label for="ngayMuon" class="form-label"><strong>Ngày mượn</strong></label>
                                            <input type="date" id="ngayMuon" class="form-control form-control"
                                                v-model="ngayMuon" required>
                                        </div>
                                        <button v-if="products.length > 0" type="submit"
                                            class="btn btn-outline-warning text-dark">
                                            Đăng ký mượn sách
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import CartService from "@/services/cart.service";
import BorrowService from "@/services/borrow.service";
import BookService from "@/services/book.service";
import UserService from "@/services/user.service";

export default {
    props: {
        products: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    data() {
        return {
            userId: localStorage.getItem("userId"),
            name: localStorage.getItem("userName"),
            ngayMuon: '',
            ngayTra: '',
            bookName: '',
            bookId: '',
            bookQuantity: 0,
            books: []
        };
    },
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        async deleteProduct(productId) {
            const userId = localStorage.getItem("userId");
            const bookId = productId;
            await CartService.delete(userId, bookId);
            alert("Xóa sản phẩm khỏi giỏ hàng thành công!");
            window.location.reload();
        },
        addBookToLoan() {
            this.products.forEach(product => {
                this.books.push({
                    name: product.name,
                    bookId: product._id,
                    quantity: product.quantity,
                });
            });
        },

        async submitForm() {
            this.addBookToLoan();
            const ngayMuonDate = new Date(this.ngayMuon);
            const ngayTraDate = new Date(ngayMuonDate.getTime() + (7 * 24 * 60 * 60 * 1000));
            const ngayTraFormatted = ngayTraDate.toISOString().slice(0, 10);

            const loanInfo = {
                userId: this.userId,
                name: this.name,
                ngayMuon: this.ngayMuon,
                ngayTra: ngayTraFormatted,
                books: this.books
            };

            // Kiểm tra các trường thông tin trước khi mượn sách
            if (!loanInfo.name || !loanInfo.ngayMuon || loanInfo.books.length === 0) {
                alert("Vui lòng điền đầy đủ thông tin và chọn sách để mượn.");
                return;
            }

            // Kiểm tra các trường thông tin cần thiết của người dùng trước khi mượn sách
            if (!this.email || !this.phone || !this.address) {
                alert("Vui lòng nhập đầy đủ thông tin của bạn");
                this.$router.push({ name: 'userpage' });
                return;
            }

            try {
                // console.log(loanInfo);
                await BorrowService.add(loanInfo);
                await CartService.deleteCart(this.userId);
                for (let i = 0; i < loanInfo.books.length; i++) {
                    const bookId = loanInfo.books[i].bookId;
                    const bookInfo = await BookService.get(bookId);
                    const data = {
                        countInStock: bookInfo.countInStock - loanInfo.books[i].quantity,
                        quantity: loanInfo.books[i].quantity,
                    };
                    await BookService.update(bookId, data);
                }
                alert("Bạn đã đăng ký mượn thành công, vui lòng chờ duyệt đơn!");
                window.location.reload();
            } catch (err) {
                console.log("Lỗi khi mượn sách:", err);
                alert("Đã xảy ra lỗi khi mượn sách. Vui lòng thử lại sau!");
            }
        },
        async getUserInfo() {
            try {
                // console.log("user", this.userId);
                const response = await UserService.get(this.userId);
                // console.log(response);
                this.email = response.email;
                this.phone = response.phone;
                this.address = response.address;

            } catch (error) {
                console.error('Lỗi khi lấy thông tin người dùng:', error);
            }
        }

    },
    mounted() {
        this.getUserInfo();
    }
};
</script>


<style scoped>
.card_product {
    position: relative;
}

.card_product::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: hsla(0, 0%, 98%, 0);
    z-index: 1;
    transition: background-color 0.3s ease-in-out;
}

.card_product:hover::after {
    background-color: hsla(0, 4%, 29%, 0.35);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>