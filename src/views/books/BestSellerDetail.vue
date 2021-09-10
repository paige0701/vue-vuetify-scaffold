<template>
  <v-container fluid>
    <v-card>
      <div class="text-h2 font-weight-black">
        {{ book.book_details[0].title }}
      </div>
      <div class="mt-3">
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td>Ranking</td>
                <td>{{ book.rank }}</td>
              </tr>
              <tr>
                <td>Published Date</td>
                <td>{{ book.published_date }}</td>
              </tr>
              <tr>
                <td>Weeks on list</td>
                <td>{{ book.weeks_on_list }}</td>
              </tr>
              <tr>
                <td>Amazon product detail</td>
                <td>
                  <a
                    :href="book.amazon_product_url"
                    target="_blank"
                  >
                    {{ book.amazon_product_url }}
                  </a>
                </td>
              </tr>
              <tr>
                <td>Description</td>
                <td>
                  {{ book.book_details[0].description }}
                </td>
              </tr>
              <tr>
                <td>Naver Items</td>
                <td>
                  <template v-for="item in naverItems.length">
                    <div :key="item">
                      {{ item }} :
                      <a
                        :href="naverItems[item-1].link"
                        target="_blank"
                      >
                        {{ naverItems[item-1].link }}
                      </a>
                    </div>
                  </template>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-card>
  </v-container>
</template>
<script>
export default {
  props: {
    book: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      naverItems: []
    }
  },
  computed: {
    bookTitle() { return this.book.book_details[0].title}
  },
  async mounted() {
    const {
      data: { items },
    } = await this.$api.naver.bookInfo(this.bookTitle)
    this.naverItems = items
  }
}
</script>
