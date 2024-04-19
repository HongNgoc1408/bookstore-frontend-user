<template>
    <div v-if="favorites.length === 0" class="d-flex justify-content-center align-items-center">
        <img src="../../assets/no_data.svg" alt="" width="50%">
    </div>
    <div class="row" v-else>
        <div v-for="(favorite, index) in favorites" :key="favorite._id" :class="{ active: index === activeIndex }"
            @click="updateActiveIndex(index)" class="col col-md-6">
            <div class="card rounded">
                <div class="row g-0">
                    <div class="col-md-4 col-sm-4">
                        <div class="d-flex justify-content-center align-items-center h-100">
                            <img :src="favorite.image" alt="Hình ảnh" class="img-fluid rounded-start"
                                style="max-height: 150px;" />
                        </div>
                    </div>
                    <div class="col-md-8 col-sm-8">
                        <div class="card-body d-flex flex-column justify-content-between h-100">
                            <div class="d-none d-sm-block">
                                <h6 class="card-title mb-1 text-truncate">{{ favorite.name }}</h6>
                                <p class="card-text mb-1 text-muted">{{ favorite.author }}</p>
                                <p class="card-text mb-1 text-muted">{{ favorite.publisher }}</p>
                                <p class="card-text mb-1 text-muted">Năm xuất bản: {{ favorite.year }}</p>
                                <p class="card-text mb-1 text-muted">Thể loại: {{ favorite.type }}</p>

                            </div>
                            <router-link :to="'/books/' + favorite._id" class="btn btn-warning">
                                Xem chi tiết
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
export default {
    props: {
        favorites: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    }
};
</script>
