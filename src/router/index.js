import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import SalesArea from '../organizations/area/SalesAreaList.vue'
import SalesAreaDetail from '../organizations/area/SalesAreaDetail.vue'
import SalesOrg from '../organizations/org/SalesOrgList.vue'
import SalesOrgDetail from '@/organizations/org/SalesOrgDetail.vue'
import DistributionChannel from '../organizations/channel/DistributionChannelList.vue'
import DistributionChannelDetail from '../organizations/channel/DistributionChannelDetail.vue'
import Division from '../organizations/div/DivisionList.vue'
import DivisionDetail from '../organizations/div/DivisionDetail.vue'
import SalesOffice from '../organizations/office/SalesOfficeList.vue'
import SalesOfficeDetail from '../organizations/office/SalesOfficeDetail.vue'
import SalesGroup from '../organizations/group/SalesGroupList.vue'
import SalesGroupDetail from '@/organizations/group/SalesGroupDetail.vue'

const routes = [
	{ path: '/', name: 'Index', component: Index },
	{ path: '/areas/', name: 'SalesAreaList', component: SalesArea },
	{ path: '/areas/:org/:channel/:div', name: 'SalesAreaDetail', component: SalesAreaDetail },
	{ path: '/orgs/', name: 'SalesOrgList', component: SalesOrg },
	{ path: '/orgs/:org', name: 'SalesOrgDetail', component: SalesOrgDetail },
	{ path: '/channels/', name: 'DistributionChannelList', component: DistributionChannel },
	{ path: '/channels/:channel', name: 'DistributionChannelDetail', component: DistributionChannelDetail },
	{ path: '/divs/', name: 'DivisionList', component: Division },
	{ path: '/divs/:div', name: 'DivisionDetail', component: DivisionDetail },
	{ path: '/offices/', name: 'SalesOfficeList', component: SalesOffice },
	{ path: '/offices/:office', name: 'SalesOfficeDetail', component: SalesOfficeDetail },
	{ path: '/groups/', name: 'SalesGroupList', component: SalesGroup },
	{ path: '/groups/:group', name: 'SalesGroupDetail', component: SalesGroupDetail },
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
