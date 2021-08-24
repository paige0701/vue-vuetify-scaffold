<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="book in books"
        :key="book._index"
      >
        <v-card
          class="mx-auto"
          max-width="344"
          @click="goDetail(book)"
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
          />

          <v-card-title>
            {{ book.book_details[0].title }}
          </v-card-title>

          <v-card-subtitle>
            {{ book.book_details[0].author }}
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              color="orange lighten-2"
              text
            >
              Rank. {{ book.rank }}
            </v-btn>

            <v-spacer />

            <v-btn
              icon
              @click="book.show = !book.show"
            >
              <v-icon>{{ book.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="book.show">
              <v-divider />

              <v-card-text>
                {{ book.book_details[0].description }}
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import * as bookApi from '@/api/book'

export default {
  name: 'BestSellers',
  data() {
    return {
      show: false,
      books: '',
    }
  },
  mounted: async function () {
    const {data: {results: books}} = await bookApi.getBestSellers({list: 'hardcover-fiction'})
    this.books = books.map((item) => {
      return {
        ...item,
        show: false,
      }
    })
  },
  methods: {
    goDetail(book) {
      this.$router.push({name: `BestSellerDetail`, params: {id: book.book_details[0].primary_isbn10, book: book}})
    }
  }
}
</script>
