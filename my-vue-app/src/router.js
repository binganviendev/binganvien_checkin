import { createRouter, createWebHashHistory } from 'vue-router';
// 1. Define route components.
// These can be imported from other files
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: () => import('@/pages/userSearchPage.vue') },
  { path: '/display-broadcast', component: () => import('@/pages/displayBroadcast.vue') },

]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export default createRouter({
  history: createWebHashHistory(),
  routes
})
