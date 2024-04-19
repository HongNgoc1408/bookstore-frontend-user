<template>
  <div class="container">
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10 d-flex">
        <InputSearch v-model="searchText" />
      </div>
    </div>

    <div class="row">
      <BookList v-if="filteredBooks.length > 0" :books="filteredBooks" :activeIndex="activeIndex" />
      <p v-else>Không có sách nào.</p>
    </div>
  </div>
</template>

<script>
import BookList from "@/components/books/BookList.vue";
import InputSearch from "@/components/InputSearch.vue";
import BookService from "@/services/book.service";
export default {

  components: {
    InputSearch,
    BookList,
  },
  data() {
    return {
      books: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    bookStrings() {
      return this.books.map((book) => {
        const { name, author, NXB, price, description, favorite } = book;
        return [name, author, NXB, price, description, favorite].join("");
      });
    },

    filteredBooks() {
      if (!this.searchText) return this.books;
      return this.books.filter((_book, index) =>
        this.bookStrings[index].includes(this.searchText)
      );
    },
  },
  methods: {
    async retrieveBooks() {
      try {
        this.books = await BookService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveBooks();
      this.activeIndex = -1;
    },
  },
  mounted() {
    this.refreshList();
  },

  // Các route khác

};
</script>

<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}
</style>
