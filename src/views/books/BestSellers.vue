<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="book in books"
        :key="book._index">
        <v-card
          class="mx-auto"
          max-width="344"
          @click="goDetail(book)">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px" />
          <v-card-subtitle> Rank. {{ book.rank }} </v-card-subtitle>
          <div class="text-h5 font-weight-black">
            {{ book.book_details[0].title }}
          </div>
          <v-card-subtitle>
            {{ book.book_details[0].author }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'BestSellers',
  data() {
    return {
      books: '',
    };
  },
  async mounted() {
    const {
      data: { results: books },
    } = await this.$api.nyt.getBestSellers({ list: 'hardcover-fiction' });
    this.books = books;
  },
  methods: {
    goDetail(book) {
      this.$router.push({
        name: `BestSellerDetail`,
        params: { id: book.book_details[0].primary_isbn10, book: book },
      });
    },
  },
};
</script>
