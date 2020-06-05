/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from "../views/Welcome/SignIn.vue";
import SignUp from '../views/Welcome/SignUp.vue';
import Welcome from "../views/Welcome.vue"
import Backstage from '../views/Backstage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
    redirect: 'signin',
    children: [
      {
        path: 'signin',
        name: 'signin',
        component: SignIn
      },
      {
        path: 'signup',
        name: 'signup',
        component: SignUp
      }
    ]
  },
  {
    path: '/backstage',
    name: 'Backstage',
    component: Backstage,
    
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
