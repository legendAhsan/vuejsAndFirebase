import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from '../views/Login.vue'
// import Register from '../views/Register.vue'
import UserDashboard from '../views/UserDashboard.vue'
import Category from '../views/Category.vue'
import EditResturant from '../views/EditResturant'
import AddResturant from '../views/AddResturant'
import ViewResturant from '../views/ViewResturant'
// import firebase from "firebase/app";
import "firebase/auth";
import store from "../store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/admin/home",
    name: "Home",
    component: Home,
    meta: {requiresAuth:true,requireAdmin:true}
  },
  {
    path: "/admin/addresturant",
    name: "AddResturant",
    component: AddResturant,
    meta: {requiresAuth:true,requireAdmin:true}
  },
  {
    path: "/admin/editresturant/:email",
    name: "EditResturant",
    component: EditResturant,
    meta: {requiresAuth:true,requireAdmin:true}
  },
  {
    path: "/admin/viewresturant/:email",
    name: "ViewResturant",
    component: ViewResturant,
    meta: {requiresAuth:true,requireAdmin:true}
  },
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/user/category",
    name: "category",
    component: Category,
    meta: {requiresAuth:true, requireAdmin:false}
  },
  {
    path: "/user/home",
    name: "userHome",
    component: UserDashboard,
    meta: {requiresAuth:true, requireAdmin:false}
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to,from,next)=>{
  const requiresAuth= to.matched.some(record=> record.meta.requiresAuth);
  const requiresAdmin= to.matched.some(record=> record.meta.requireAdmin);
  // // const isAuthenticated=firebase.auth().currentUser;
  // console.log('logged in',store.state.loggedIn);
  if(requiresAuth && store.state.loggedIn==false){
    console.log(requiresAuth,store.state.loggedIn)
    next("/");
  }
  else if(requiresAuth && store.state.loggedIn==true && requiresAdmin && store.state.admin==false){
    next("/user/home");
  }
  else if(requiresAuth && store.state.loggedIn==true && requiresAdmin==false && store.state.admin==true){
    next("/admin/home");
  }
  else{
    next();
  }
})

export default router;
