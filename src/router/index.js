import Vue from 'vue';
import Router from 'vue-router';
import ClockWall from '@/components/ClockWall';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ClockWall',
      component: ClockWall,
    },
  ],
});
