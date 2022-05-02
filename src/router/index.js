import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/Index.vue'
import SalesArea from '@/organizations/area/SalesAreaList.vue'
import SalesAreaDetail from '@/organizations/area/SalesAreaDetail.vue'
import OrgDetail from '@/organizations/OrgDetail.vue'
import OrgList from '@/organizations/OrgList.vue'

const pathPrefix = "/org";

const routes = [
	{ path: pathPrefix + '/', name: 'Index', component: Index },

	{ path: pathPrefix + '/areas/', name: 'salesAreaList', component: SalesArea, props: {
		orgUri: "areas",
	}},

	{ path: pathPrefix + '/areas/:org/:channel/:div', name: 'SalesAreaDetail', component: SalesAreaDetail },

	{ path: pathPrefix + '/orgs/', name: 'salesOrgList', component: OrgList, props: {
		orgUri: "orgs",
		orgDesc: "Sales Org.",
		orgName: "salesOrg",
	}},
	{ path: pathPrefix + '/orgs/:orgCode', name: 'salesOrgDetail', component: OrgDetail, props: {
		orgUri: "orgs",
		orgDesc: "Sales Org.",
		orgName: "salesOrg",
	}},
	
	{ path: pathPrefix + '/channels/', name: 'distributionChannelList', component: OrgList, props: {
		orgUri: "channels",
		orgDesc: "Distribution Channel",
		orgName: "distributionChannel",
	}},
	{ path: pathPrefix + '/channels/:orgCode', name: 'distributionChannelDetail', component: OrgDetail, props: {
		orgUri: "channels",
		orgDesc: "Distribution Channel",
		orgName: "distributionChannel",
	}},

	{ path: pathPrefix + '/divs/', name: 'divisionList', component: OrgList, props: {
		orgUri: "divs",
		orgDesc: "Division",
		orgName: "division",
	}},
	{ path: pathPrefix + '/divs/:orgCode', name: 'divisionDetail', component: OrgDetail, props: {
		orgUri: "divs",
		orgDesc: "Division",
		orgName: "division",
	}},

	{ path: pathPrefix + '/offices/', name: 'salesOfficeList', component: OrgList, props: {
		orgUri: "offices",
		orgDesc: "Sales Office",
		orgName: "salesOffice",
	}},
	{ path: pathPrefix + '/offices/:orgCode', name: 'salesOfficeDetail', component: OrgDetail, props: {
		orgUri: "offices",
		orgDesc: "Sales Office",
		orgName: "salesOffice",
	}},

	{ path: pathPrefix + '/groups/', name: 'salesGroupList', component: OrgList, props: {
		orgUri: "groups",
		orgDesc: "Sales Group",
		orgName: "salesGroup",
	}},
	{ path: pathPrefix + '/groups/:orgCode', name: 'salesGroupDetail', component: OrgDetail, props: {
		orgUri: "groups",
		orgDesc: "Sales Group",
		orgName: "salesGroup",
	}},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
