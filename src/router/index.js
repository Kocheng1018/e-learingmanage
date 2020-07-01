/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from "../views/Welcome/SignIn.vue";
import SignUp from '../views/Welcome/SignUp.vue';
import Welcome from "../views/Welcome.vue"
import Backstage from '../views/Backstage.vue';
import ClassList from '../views/backstage/ClassList.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Welcome,
    redirect: 'signin',
    children: [
      {
        path: 'signin',
        component: SignIn
      },
      {
        path: 'signup',
        component: SignUp
      }
    ]
  },
  {
    path: '/backstage',
    component: Backstage,
    redirect: `backstage/classlist`,
    children: [
      {
        path: 'classlist',
        component: ClassList
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
