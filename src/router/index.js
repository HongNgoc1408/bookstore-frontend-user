import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "bookstore",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: "/books/:id",
    name: "bookdetails",
    component: () => import("@/views/books/BookDetails.vue"),
    props: true,
  },
  {
    path: "/cart/:id",
    name: "cartpage",
    component: () => import("@/views/cart/CartPage.vue"),
    props: true,
  },
  {
    path: "/borrow/:id",
    name: "borrowpage",
    component: () => import("@/views/borrow/BorrowPage.vue"),
    props: true,
  },
  {
    path: "/favorite/:id",
    name: "favorite",
    component: () => import("@/views/favorite/FavoritePage.vue"),
    props: true,
  },
  {
    path: "/users/:id",
    name: "userpage",
    component: () => import("@/views/users/UserPage.vue"),
    props: true,
  },
  
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
