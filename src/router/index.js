import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/Index.vue'
import Dashboard from '@/modules/organizations/Dashboard.vue'
import SalesArea from '@/modules/organizations/area/SalesAreaList.vue'
import SalesAreaDetail from '@/modules/organizations/area/SalesAreaDetail.vue'
import OrgDetail from '@/modules/organizations/OrgDetail.vue'
import OrgList from '@/modules/organizations/OrgList.vue'
import CustomerList from '@/modules/customers/CustomerList.vue'
import CustomerDetail from '@/modules/customers/CustomerDetail.vue'
import ProductList from '@/modules/products/ProductList.vue'
import ProductDetail from '@/modules/products/ProductDetail.vue'
import Login from '@/modules/users/Login.vue'
import Profile from '@/modules/users/Profile.vue'
import Settings from '@/modules/users/Settings.vue'

const consoleRoutes = [
	{ name: 'Index', path: '/', component: Index, }
];

const orgRoutes = [
	{ name: 'orgDashboard', path: '/orgs/', component: Dashboard },
	{ name: 'salesAreaList', path: '/orgs/areas/', component: SalesArea, props: { orgUri: "areas", }},
	{ name: 'SalesAreaDetail', path: '/orgs/areas/:org/:channel/:div', component: SalesAreaDetail },
	{ name: 'salesOrgList', path: '/orgs/orgs/', component: OrgList, props: { orgUri: "orgs", orgDesc: "Sales Org.", orgName: "salesOrg", }},
	{ name: 'salesOrgDetail', path: '/orgs/orgs/:orgCode', component: OrgDetail, props: { orgUri: "orgs", orgDesc: "Sales Org.", orgName: "salesOrg", }},
	{ name: 'distributionChannelList', path: '/orgs/channels/', component: OrgList, props: { orgUri: "channels", orgDesc: "Distribution Channel", orgName: "distributionChannel", }},
	{ name: 'distributionChannelDetail', path: '/orgs/channels/:orgCode', component: OrgDetail, props: { orgUri: "channels", orgDesc: "Distribution Channel", orgName: "distributionChannel", }},
	{ name: 'divisionList', path: '/orgs/divs/', component: OrgList, props: { orgUri: "divs", orgDesc: "Division", orgName: "division", }},
	{ name: 'divisionDetail', path: '/orgs/divs/:orgCode', component: OrgDetail, props: { orgUri: "divs", orgDesc: "Division", orgName: "division", }},
	{ name: 'salesOfficeList', path: '/orgs/offices/', component: OrgList, props: { orgUri: "offices", orgDesc: "Sales Office", orgName: "salesOffice", }},
	{ name: 'salesOfficeDetail', path: '/orgs/offices/:orgCode', component: OrgDetail, props: { orgUri: "offices", orgDesc: "Sales Office", orgName: "salesOffice", }},
	{ name: 'salesGroupList', path: '/orgs/groups/', component: OrgList, props: { orgUri: "groups", orgDesc: "Sales Group", orgName: "salesGroup", }},
	{ name: 'salesGroupDetail', path: '/orgs/groups/:orgCode', component: OrgDetail, props: { orgUri: "groups", orgDesc: "Sales Group", orgName: "salesGroup", }},
];

const customerRoutes = [
	{ name: 'customerList', path: '/customers/', component: CustomerList },
	{ name: 'customerDetail', path: '/customers/:customerNo', component: CustomerDetail },
];

const productRoutes = [
	{ name: 'productList', path: '/products/', component: ProductList },
	{ name: 'productDetail', path: '/products/:productNo', component: ProductDetail },
];

const userRoutes = [
	{ name: 'login', path: '/login/', component: Login },
	{ name: 'profile', path: '/user/profile/', component: Profile },
	{ name: 'settings', path: '/user/settings/', component: Settings },
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes: consoleRoutes
		.concat(orgRoutes)
		.concat(customerRoutes)
		.concat(productRoutes)
		.concat(userRoutes)
		,
})

export default router
