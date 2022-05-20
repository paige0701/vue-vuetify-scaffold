export default (axios) => ({
  bookInfo(title) {
    return axios.get(`/naver/search/book_adv?d_titl=${title}`);
  },
});
