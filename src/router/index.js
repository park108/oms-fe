import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import SalesArea from '../organizations/area/SalesAreaList.vue'
import SalesOrg from '../organizations/org/SalesOrgList.vue'
import DistributionChannel from '../organizations/channel/DistributionChannelList.vue'
import Division from '../organizations/div/DivisionList.vue'
import SalesOffice from '../organizations/office/SalesOfficeList.vue'
import SalesGroup from '../organizations/group/SalesGroupList.vue'

const routes = [
	{ path: '/', name: 'Index', component: Index },
	{ path: '/areas/', name: 'SalesArea', component: SalesArea },
	{ path: '/orgs/', name: 'SalesOrg', component: SalesOrg },
	{ path: '/channels/', name: 'DistributionChannel', component: DistributionChannel },
	{ path: '/divs/', name: 'Division', component: Division },
	{ path: '/offices/', name: 'SalesOffice', component: SalesOffice },
	{ path: '/groups/', name: 'SalesGroup', component: SalesGroup },
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
