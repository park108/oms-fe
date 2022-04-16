import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import SalesArea from '@/organizations/area/SalesAreaList.vue'
import SalesAreaDetail from '@/organizations/area/SalesAreaDetail.vue'
import OrgDetail from '@/organizations/OrgDetail.vue'
import OrgList from '@/organizations/OrgList.vue'

const routes = [
	{ path: '/', name: 'Index', component: Index },
	{ path: '/areas/', name: 'salesAreaList', component: SalesArea },
	{ path: '/areas/:org/:channel/:div', name: 'SalesAreaDetail', component: SalesAreaDetail },

	{ path: '/orgs/', name: 'salesOrgList', component: OrgList, props: {
		orgDesc: "Sales Org.",
		orgName: "salesOrg",
	}},
	{ path: '/orgs/:orgCode', name: 'salesOrgDetail', component: OrgDetail, props: {
		orgDesc: "Sales Org.",
		orgName: "salesOrg",
	}},
	
	{ path: '/channels/', name: 'distributionChannelList', component: OrgList, props: {
		orgDesc: "Distribution Channel",
		orgName: "distributionChannel",
	}},
	{ path: '/channels/:orgCode', name: 'distributionChannelDetail', component: OrgDetail, props: {
		orgDesc: "Distribution Channel",
		orgName: "distributionChannel",
	}},

	{ path: '/divs/', name: 'divisionList', component: OrgList, props: {
		orgDesc: "Division",
		orgName: "division",
	}},
	{ path: '/divs/:orgCode', name: 'divisionDetail', component: OrgDetail, props: {
		orgDesc: "Division",
		orgName: "division",
	}},

	{ path: '/offices/', name: 'salesOfficeList', component: OrgList, props: {
		orgDesc: "Sales Office",
		orgName: "salesOffice",
	}},
	{ path: '/offices/:orgCode', name: 'salesOfficeDetail', component: OrgDetail, props: {
		orgDesc: "Sales Office",
		orgName: "salesOffice",
	}},

	{ path: '/groups/', name: 'salesGroupList', component: OrgList, props: {
		orgDesc: "Sales Group",
		orgName: "salesGroup",
	}},
	{ path: '/groups/:orgCode', name: 'salesGroupDetail', component: OrgDetail, props: {
		orgDesc: "Sales Group",
		orgName: "salesGroup",
	}},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
