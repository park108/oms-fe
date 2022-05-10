import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/Index.vue'
import Dashboard from '@/organizations/Dashboard.vue'
import SalesArea from '@/organizations/area/SalesAreaList.vue'
import SalesAreaDetail from '@/organizations/area/SalesAreaDetail.vue'
import OrgDetail from '@/organizations/OrgDetail.vue'
import OrgList from '@/organizations/OrgList.vue'
import CustomerList from '@/customers/CustomerList.vue'
import CustomerDetail from '@/customers/CustomerDetail.vue'

const consoleRoutes = [
	{ name: 'Index', path: '/', component: Index, }
];

const orgRoutes = [
	{ name: 'orgDashboard', path: '/org/', component: Dashboard },
	{ name: 'salesAreaList', path: '/org/areas/', component: SalesArea, props: { orgUri: "areas", }},
	{ name: 'SalesAreaDetail', path: '/org/areas/:org/:channel/:div', component: SalesAreaDetail },
	{ name: 'salesOrgList', path: '/org/orgs/', component: OrgList, props: { orgUri: "orgs", orgDesc: "Sales Org.", orgName: "salesOrg", }},
	{ name: 'salesOrgDetail', path: '/org/orgs/:orgCode', component: OrgDetail, props: { orgUri: "orgs", orgDesc: "Sales Org.", orgName: "salesOrg", }},
	{ name: 'distributionChannelList', path: '/org/channels/', component: OrgList, props: { orgUri: "channels", orgDesc: "Distribution Channel", orgName: "distributionChannel", }},
	{ name: 'distributionChannelDetail', path: '/org/channels/:orgCode', component: OrgDetail, props: { orgUri: "channels", orgDesc: "Distribution Channel", orgName: "distributionChannel", }},
	{ name: 'divisionList', path: '/org/divs/', component: OrgList, props: { orgUri: "divs", orgDesc: "Division", orgName: "division", }},
	{ name: 'divisionDetail', path: '/org/divs/:orgCode', component: OrgDetail, props: { orgUri: "divs", orgDesc: "Division", orgName: "division", }},
	{ name: 'salesOfficeList', path: '/org/offices/', component: OrgList, props: { orgUri: "offices", orgDesc: "Sales Office", orgName: "salesOffice", }},
	{ name: 'salesOfficeDetail', path: '/org/offices/:orgCode', component: OrgDetail, props: { orgUri: "offices", orgDesc: "Sales Office", orgName: "salesOffice", }},
	{ name: 'salesGroupList', path: '/org/groups/', component: OrgList, props: { orgUri: "groups", orgDesc: "Sales Group", orgName: "salesGroup", }},
	{ name: 'salesGroupDetail', path: '/org/groups/:orgCode', component: OrgDetail, props: { orgUri: "groups", orgDesc: "Sales Group", orgName: "salesGroup", }},
];

const customerRoutes = [
	{ name: 'customerList', path: '/customer/', component: CustomerList },
	{ name: 'customerDetail', path: '/customer/:customerNo', component: CustomerDetail },
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes: consoleRoutes.concat(orgRoutes).concat(customerRoutes),
})

export default router
