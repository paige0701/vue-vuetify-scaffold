import {naverInstance} from "@/api/index";
export const getBookInfo = (title) => {
  return naverInstance.get(`/search/book_adv?d_titl=${title}`)
}
