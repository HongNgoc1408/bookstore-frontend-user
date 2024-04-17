<template>
    <nav class="navbar navbar-expand-lg navbar-light text-semibold" style="background-color: bisque;">
        <div class="container">
            <router-link :to="{ name: 'bookstore' }" class="navbar-brand nav-link">
                Kho Sách
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item" v-if="userName">
                        <router-link :to="{ name: 'favorite', params: { id: userId }, }" class="nav-link">
                            Sách yêu thích
                        </router-link>
                    </li>

                    <li class="nav-item" v-if="userName">
                        <router-link :to="{ name: 'cartpage', params: { id: userId }, }" class="nav-link">
                            Giỏ hàng
                        </router-link>
                    </li>

                    <li class="nav-item" v-if="userName">
                        <router-link :to="{ name: 'borrowpage', params: { id: userId }, }" class="nav-link">
                            <span> Lịch sử mượn sách</span>
                        </router-link>
                    </li>
                </ul>


                <div class="d-flex dropdown">
                    <div v-if="userName">
                        <button class="btn btn-outline-warning text-dark dropdown-toggle" type="button"
                            id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            {{ userName }}
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li>
                                <router-link :to="{ name: 'userpage', params: { id: userId }, }"
                                    class="dropdown-item">Thông tin</router-link>
                            </li>
                            <li>
                                <router-link to="#" class="dropdown-item" @click="confirmLogout">Đăng xuất</router-link>
                            </li>
                        </ul>
                    </div>

                    <div v-else>
                        <button class="btn btn-outline-warning text-dark dropdown-toggle" type="button"
                            id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            Tài khoản
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li>
                                <router-link :to="{ name: 'register', }" class="dropdown-item">Đăng ký</router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'login', }" class="dropdown-item">Đăng nhập</router-link>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </nav>
</template>

<script>


export default {
    data() {
        return {
            userName: '',
        };
    },
    mounted() {
        this.getUserFromLocalStorage();
    },
    methods: {
        getUserFromLocalStorage() {
            const userName = localStorage.getItem('userName');
            const userId = localStorage.getItem('userId');

            if (userName) {
                this.userName = userName;
                this.userId = userId;
            }
        },
        confirmLogout() {
            if (confirm("Bạn có chắc muốn đăng xuất không?")) {
                this.logout();
            }
        },
        logout() {

            localStorage.removeItem('userId');
            localStorage.removeItem('userName');

            this.userName = '';
            this.$router.push({ name: 'bookstore' });
        }
    }
};
</script>