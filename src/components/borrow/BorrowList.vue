<template>
    <div>
        <div class="accordion m-5" id="accordionExample">
            <div v-if="borrows.length === 0" class="mx-auto">
                <img src="../../assets/no_data.svg" alt="" width="100%">
            </div>
            <div v-else>
                <div v-for="(borrow, index) in borrows" :key="borrow._id" class="accordion-item">
                    <h2 class="accordion-header" id="heading{{ index }}">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                            :data-bs-target="'#collapse' + index" :aria-expanded="index === 0 ? 'true' : 'false'"
                            :aria-controls="'collapse' + index">
                            Mã mượn sách {{ borrow._id }}
                        </button>
                    </h2>
                    <div :id="'collapse' + index" class="accordion-collapse collapse" :class="{ show: index === 0 }"
                        aria-labelledby="heading{{ index }}" :aria-expanded="index === 0 ? 'true' : 'false'">
                        <div class="accordion-body">
                            <!-- Hiển thị thông tin chi tiết của đơn hàng -->
                            <p><strong>Tên người mượn:</strong> {{ borrow.name }}</p>
                            <p><strong>Ngày mượn:</strong> {{ borrow.ngayMuon }}</p>
                            <p><strong>Ngày trả:</strong> {{ borrow.ngayTra }}</p>
                            <ul>
                                <li v-for="(book, bookIndex) in borrow.books" :key="book.bookId">
                                    <!-- Hiển thị thông tin từng cuốn sách trong đơn hàng -->
                                    <strong>{{ 'Sách ' + (bookIndex + 1) }}:</strong> {{ book.name }} ({{ book.quantity
                                    }})
                                </li>
                            </ul>
                            <div class="d-flex justify-content-end">
                                <router-link v-if="borrow.status === 'Đang đợi duyệt'" to="#"
                                    class="btn btn-sm btn-danger" @click="submit(borrow._id)">
                                    <i class="fas fa-edit me-1"></i> Yêu cầu hủy đăng ký mượn sách
                                </router-link>
                                <button v-else class="btn btn-sm btn-danger" disabled>
                                    <i class="fas fa-edit me-1"></i> Yêu cầu hủy đăng ký mượn sách
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
import BorrowService from "@/services/borrow.service"
import BookService from "@/services/book.service"

export default {
    props: {
        borrows: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },

        async submit(id) {
            if (confirm("Bạn có chắc chắn muốn hủy mượn sách không?")) {
                const submitData = {
                    status: "Đã hủy thành công",
                };
                await BorrowService.update(id, submitData);
                alert("Đã hủy thành công!");
                window.location.reload();
            }
        }
    },
};
</script>
