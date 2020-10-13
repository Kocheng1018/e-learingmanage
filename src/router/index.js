/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from "../views/Welcome/SignIn.vue";
import SignUp from '../views/Welcome/SignUp.vue';
import Welcome from "../views/Welcome.vue"
import Backstage from '../views/Backstage.vue';
import ClassList from '../views/Class/ClassList.vue';
import LessonList from '../views/backstage/LessonList.vue';
import Class from "../views/Class.vue";
import LessonRecord from "../views/backstage/LessonRecord.vue"

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
    path: "/class",
    component: Class,
    redirect: "class/classlist",
    children: [
      {
        path: "classlist",
        component: ClassList
      }
    ]
  },
  {
    path: '/backstage',
    component: Backstage,
    name: `backstage`,
    children: [
      {
        path: 'classrecord/:classID',
        component: LessonRecord
      },
      {
        path: `classlist/:classID`,
        name: "classContent",
        component: LessonList,
      },
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
