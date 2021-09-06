import {naverInstance} from "@/api/index";
export const getBookInfo = (title) => {
  return naverInstance.get(`/naver/search/book_adv?d_titl=${title}`)
}
