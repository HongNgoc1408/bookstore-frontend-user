import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import router from "./router";
// import "../src/assets/main.css";
import "../src/assets/form.css";
createApp(App).use(router).mount("#app");
