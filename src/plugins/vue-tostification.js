import Vue from "vue";
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options = {
  // You can set your default options here
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
};


Vue.use(Toast, options);
