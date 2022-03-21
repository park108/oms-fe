import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import SalesOrg from '../organizations/SalesOrg.vue'
import DistributionChannel from '../organizations/DistributionChannel.vue'
import Division from '../organizations/Division.vue'
import SalesOffice from '../organizations/SalesOffice.vue'
import SalesGroup from '../organizations/SalesGroup.vue'

const routes = [
	{ path: '/', name: 'Index', component: Index },
	{ path: '/orgs/:org', name: 'SalesOrg', component: SalesOrg },
	{ path: '/channels/:channel', name: 'DistributionChannel', component: DistributionChannel },
	{ path: '/divs/:div', name: 'Division', component: Division },
	{ path: '/offices/:office', name: 'SalesOffice', component: SalesOffice },
	{ path: '/groups/:group', name: 'SalesGroup', component: SalesGroup },
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
