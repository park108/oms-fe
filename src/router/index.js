import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import SalesArea from '../organizations/area/SalesAreaList.vue'
import SalesOrg from '../organizations/org/SalesOrgList.vue'
import SalesOrgDetail from '@/organizations/org/SalesOrgDetail.vue'
import DistributionChannel from '../organizations/channel/DistributionChannelList.vue'
import Division from '../organizations/div/DivisionList.vue'
import SalesOffice from '../organizations/office/SalesOfficeList.vue'
import SalesGroup from '../organizations/group/SalesGroupList.vue'

const routes = [
	{ path: '/', name: 'Index', component: Index },
	{ path: '/areas/', name: 'SalesAreaList', component: SalesArea },
	{ path: '/orgs/', name: 'SalesOrgList', component: SalesOrg },
	{ path: '/orgs/:org', name: 'SalesOrgDetail', component: SalesOrgDetail },
	{ path: '/channels/', name: 'DistributionChannelList', component: DistributionChannel },
	{ path: '/divs/', name: 'DivisionList', component: Division },
	{ path: '/offices/', name: 'SalesOfficeList', component: SalesOffice },
	{ path: '/groups/', name: 'SalesGroupList', component: SalesGroup },
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
