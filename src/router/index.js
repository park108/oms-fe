import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/Index.vue'
import Dashboard from '@/organizations/Dashboard.vue'
import SalesArea from '@/organizations/area/SalesAreaList.vue'
import SalesAreaDetail from '@/organizations/area/SalesAreaDetail.vue'
import OrgDetail from '@/organizations/OrgDetail.vue'
import OrgList from '@/organizations/OrgList.vue'
import CustomerList from '@/customers/CustomerList.vue'

const consoleRoutes = [
	// Index
	{ path: '/', name: 'Index', component: Index }
];

const orgRoutes = [
	// Index
	{ path: '/org/', name: 'orgDashboard', component: Dashboard },

	// Sales Area
	{ path: '/org/areas/', name: 'salesAreaList', component: SalesArea, props: {
		orgUri: "areas",
	}},
	{ path: '/org/areas/:org/:channel/:div', name: 'SalesAreaDetail', component: SalesAreaDetail },

	// Sales Org.
	{ path: '/org/orgs/', name: 'salesOrgList', component: OrgList, props: {
		orgUri: "orgs",
		orgDesc: "Sales Org.",
		orgName: "salesOrg",
	}},
	{ path: '/org/orgs/:orgCode', name: 'salesOrgDetail', component: OrgDetail, props: {
		orgUri: "orgs",
		orgDesc: "Sales Org.",
		orgName: "salesOrg",
	}},
	
	// Distribution Channel
	{ path: '/org/channels/', name: 'distributionChannelList', component: OrgList, props: {
		orgUri: "channels",
		orgDesc: "Distribution Channel",
		orgName: "distributionChannel",
	}},
	{ path: '/org/channels/:orgCode', name: 'distributionChannelDetail', component: OrgDetail, props: {
		orgUri: "channels",
		orgDesc: "Distribution Channel",
		orgName: "distributionChannel",
	}},
	
	// Division
	{ path: '/org/divs/', name: 'divisionList', component: OrgList, props: {
		orgUri: "divs",
		orgDesc: "Division",
		orgName: "division",
	}},
	{ path: '/org/divs/:orgCode', name: 'divisionDetail', component: OrgDetail, props: {
		orgUri: "divs",
		orgDesc: "Division",
		orgName: "division",
	}},
	
	// Sales Office
	{ path: '/org/offices/', name: 'salesOfficeList', component: OrgList, props: {
		orgUri: "offices",
		orgDesc: "Sales Office",
		orgName: "salesOffice",
	}},
	{ path: '/org/offices/:orgCode', name: 'salesOfficeDetail', component: OrgDetail, props: {
		orgUri: "offices",
		orgDesc: "Sales Office",
		orgName: "salesOffice",
	}},

	// Sales Group
	{ path: '/org/groups/', name: 'salesGroupList', component: OrgList, props: {
		orgUri: "groups",
		orgDesc: "Sales Group",
		orgName: "salesGroup",
	}},
	{ path: '/org/groups/:orgCode', name: 'salesGroupDetail', component: OrgDetail, props: {
		orgUri: "groups",
		orgDesc: "Sales Group",
		orgName: "salesGroup",
	}},
];

const customerRoutes = [
	// Index
	{ path: '/customer/', name: 'customerList', component: CustomerList },
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes: consoleRoutes.concat(orgRoutes).concat(customerRoutes),
})

export default router
