import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import SalesArea from '@/organizations/area/SalesAreaList.vue'
import SalesAreaDetail from '@/organizations/area/SalesAreaDetail.vue'
import SalesOrg from '@/organizations/org/SalesOrgList.vue'
import DistributionChannel from '@/organizations/channel/DistributionChannelList.vue'
import Division from '@/organizations/div/DivisionList.vue'
import SalesOffice from '@/organizations/office/SalesOfficeList.vue'
import SalesGroup from '@/organizations/group/SalesGroupList.vue'
import OrgDetail from '@/organizations/OrgDetail.vue'

const routes = [
	{ path: '/', name: 'Index', component: Index },
	{ path: '/areas/', name: 'SalesAreaList', component: SalesArea },
	{ path: '/areas/:org/:channel/:div', name: 'SalesAreaDetail', component: SalesAreaDetail },
	{ path: '/orgs/', name: 'SalesOrgList', component: SalesOrg },
	{ path: '/orgs/:orgCode', name: 'SalesOrgDetail', component: OrgDetail, props: true },
	{ path: '/channels/', name: 'DistributionChannelList', component: DistributionChannel },
	{ path: '/channels/:orgCode', name: 'DistributionChannelDetail', component: OrgDetail, props: true },
	{ path: '/divs/', name: 'DivisionList', component: Division },
	{ path: '/divs/:orgCode', name: 'DivisionDetail', component: OrgDetail, props: true },
	{ path: '/offices/', name: 'SalesOfficeList', component: SalesOffice },
	{ path: '/offices/:orgCode', name: 'SalesOfficeDetail', component: OrgDetail, props: true },
	{ path: '/groups/', name: 'SalesGroupList', component: SalesGroup },
	{ path: '/groups/:orgCode', name: 'SalesGroupDetail', component: OrgDetail, props: true },
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
