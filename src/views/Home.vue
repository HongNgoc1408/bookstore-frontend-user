<template>
  <div class="container">
    <img src="https://theme.hstatic.net/200000654445/1000999355/14/collection_banner.jpg?v=354" class="d-block w-100"
      alt="...">

    <div class="row mt-5">
      <div class="col-3 d-flex">
        <div class="row input-group">
          <div class="col-12 ">
            <select class="p-2 border rounded fw-semibold" v-model="selectedPublisher">
              <option value="">Tất cả nhà xuất bản</option>
              <option v-for="(publisher, index) in publishers" :key="index" :value="publisher">{{ publisher }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-9 d-flex">
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
import PublishService from "@/services/publish.service";
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
      selectedPublisher: "",
      publishers: [],
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
        const { name, author, publisher, year, countInStock, quantity, type, description, favorite } = book;
        return [name, author, publisher, year, countInStock, quantity, type, description, favorite].join("");
      });
    },

    filteredBooks() {
      let filtered = this.books;
      if (this.selectedPublisher) {
        filtered = filtered.filter(book => book.publisher === this.selectedPublisher);
      }
      if (this.searchText) {
        filtered = filtered.filter((_book, index) => this.bookStrings[index].includes(this.searchText));
      }
      return filtered;
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

    async retrievePublishers() {
      try {
        const publishers = await PublishService.getAll();
        this.publishers = publishers.map(publisher => publisher.name);
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveBooks();
      this.retrievePublishers();
      this.activeIndex = -1;
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}
</style>
