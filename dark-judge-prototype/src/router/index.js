import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ScenarioSelect from '../views/ScenarioSelect.vue'
import Scenario from '../views/Scenario.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/scenarios', name: 'scenarios', component: ScenarioSelect },
  { path: '/scenario/:id', name: 'scenario', component: Scenario, props: true },
  { path: '/dashboard', name: 'dashboard', component: Dashboard },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
