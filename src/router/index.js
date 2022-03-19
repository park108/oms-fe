import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import SalesOrg from '../views/SalesOrg.vue'

const routes = [
	{ path: '/', name: 'Index', component: Index },
	{ path: '/orgs/:org', name: 'SalesOrg', component: SalesOrg },
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
