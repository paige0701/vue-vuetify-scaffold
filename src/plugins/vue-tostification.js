import Vue from "vue";
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options = {
  // You can set your default options here
  maxToasts: 1,
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
};


Vue.use(Toast, options);