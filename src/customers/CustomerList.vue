<template>
	<Header title="Customer Manager" routeName="customerList" />
	<main class="main">
		<section class="section section--split-one" v-show="false">
			<Corporation @setCorpId="setCorpId" />
		</section>
		<section class="section section--list-filter">
			<button @click="toggleFilter">{{filterToggleButtonName}}</button>
			<div v-show="isFilterOpen">
				<div class="div div--listfilter-item">
					<label class="label label--list-filter" :class="{'label--filter-on': isFiltered('customerNo')}" for="customer-no">Customer No.</label>
					<input class="input input--list-filter" type="input" id="customer-no" v-model="filter.customerNo" v-on:keyup="updateFilter('customerNo')" />
				</div>
				<div class="div div--listfilter-item">
					<label class="label label--list-filter" :class="{'label--filter-on': isFiltered('customerName')}" for="customer-name">Customer Name</label>
					<input class="input input--list-filter" type="input" id="customer-name" v-model="filter.customerName" v-on:keyup="updateFilter('customerName')" />
				</div>
				<div class="div div--listfilter-item">
					<label class="label label--list-filter" :class="{'label--filter-on': isFiltered('address')}" for="address">Address</label>
					<input class="input input--list-filter" type="input" id="address" v-model="filter.address" v-on:keyup="updateFilter('address')"/>
				</div>
				<div class="div div--listfilter-item">
					<label class="label label--list-filter" :class="{'label--filter-on': isFiltered('salesOrg')}" for="sales-org">Sales Org.</label>
					<select class="select select--list-filter" id="sales-org" v-model="filter.salesOrg" @change="updateFilter('salesOrg')" >
						<option value="">All</option>
						<option value="S000">S000 - Battery</option>
						<option value="S100">S100 - Material</option>
					</select>
				</div>
				<div class="div div--listfilter-item">
					<label class="label label--list-filter" :class="{'label--filter-on': isFiltered('distributionChannel')}" for="distribution-channel">Distribution Channel</label>
					<select class="select select--list-filter" id="distribution-channel" v-model="filter.distributionChannel" @change="updateFilter('distributionChannel')" >
						<option value="">All</option>
						<option value="20">20 - Domestic</option>
						<option value="40">40 - Export</option>
					</select>
				</div>
				<div class="div div--listfilter-item">
					<label class="label label--list-filter" :class="{'label--filter-on': isFiltered('division')}" for="division">Division</label>
					<select class="select select--list-filter" id="division" v-model="filter.division" @change="updateFilter('division')" >
						<option value="">All</option>
						<option value="51">51 - Battery</option>
						<option value="61">61 - Material</option>
					</select>
				</div>
			</div>
		</section>
		<div class="div div--list-result">
			<span class="span span--list-result">
				Total:
				<span v-if="isLoading">...</span>
				<span v-else>{{customers.length}}</span>
				customers
			</span>
			<span class="span span--list-result" v-if="filterDescription.length > 0">, Filtered: {{filteredCustomers.length}} by {{filterDescription}}</span>
		</div>
		<div class="div div--table-box">
			<table class="table table--main-list" v-if="isLoading">
				<tr class="tr tr--row-header">
					<th class="th">No.</th>
					<th class="th">Name</th>
					<th class="th">Address</th>
				</tr>
				<tr class="tr tr--row-selectable" v-for="index in 10" :key="index">
					<td class="td td--customer-no"><span class="span span--org-skeletonbox">&nbsp;</span></td>
					<td class="td td--customer-name td--list-loading"><span class="span span--org-skeletonbox">&nbsp;</span></td>
					<td class="td td--customer-address td--list-loading"><span class="span span--org-skeletonbox">&nbsp;</span></td>
				</tr>
			</table>
			<table class="table table--main-list" v-else>
				<tr class="tr tr--row-header">
					<th class="th">No.</th>
					<th class="th">Name</th>
					<th class="th">Address</th>
				</tr>
				<tr class="tr tr--row-selectable" v-for="item in filteredCustomers" :key="item.customerNo" @click="moveDetail(item.customerNo)">
					<td class="td td--customer-no">{{item.customerNo}}</td>
					<td class="td td--customer-name">{{item.customerName}}</td>
					<td class="td td--customer-address">{{item.address}}</td>
				</tr>
			</table>
		</div>
	</main>
	<Footer />
</template>
<script>
	import Header from "@/Header.vue";
	import Corporation from "@/Corporation.vue";
	import Footer from "@/Footer.vue";
	import { log, isUuid } from "@/common.js"
	import { CustomerDataHandler } from "@/customers/CustomerDataHandler.js";

	export default {
		data() {
			return {
				isLoading: true,
				isFilterOpen: false,
				filterDescription: "",
				filterToggleButtonName: "Open",
				filter: {
					customerNo: "",
					customerName: "",
					address: "",
					salesOrg: "",
					distributionChannel: "",
					division: "",
				},
				corpId: String,
				customers: [],
				filteredCustomers: [],
			}
		},
		components: {
			Header,
			Corporation,
			Footer,
		},
		created() {
			document.title = "Customer Manager - OMS";
			this.filter.customerNo = this.$store.state.filter.customerList.customerNo;
			this.filter.customerName = this.$store.state.filter.customerList.customerName;
			this.filter.address = this.$store.state.filter.customerList.address;
			this.filter.salesOrg = this.$store.state.filter.customerList.salesOrg;
			this.filter.distributionChannel = this.$store.state.filter.customerList.distributionChannel;
			this.filter.division = this.$store.state.filter.customerList.division;
		},
		watch: {
			corpId: async function () {
				if(isUuid(this.corpId)) {
					// TODO: Get customer list initializing time
					this.customers = await CustomerDataHandler.getList(this.corp);

					if(null === this.customers) {
						popToast("WARNING", "Customer data not found.", this.$store);
					}
					else {
						this.updateFilter();
						this.setFilterButton();
					}
					this.isLoading = false;
				}
			},
		},
		methods: {
			setCorpId(value) {
				this.corpId = value;
			},
			isFiltered(filterName) {
				return this.filter[filterName].length > 0;
			},
			setFilterButton() {
				this.filterToggleButtonName = this.isFilterOpen ? "Close"
					: this.isFiltered("customerNo") || this.isFiltered("customerName") || this.isFiltered("address") ? "Filtered"
					: "Open";
			},
			toggleFilter() {
				this.isFilterOpen = !this.isFilterOpen;
				this.setFilterButton();
			},
			updateFilter(filterName) {
				this.filteredCustomers = this.customers;
				this.filterDescription = "";
				
				if(this.isFiltered("customerNo")) {
					this.filteredCustomers = this.filteredCustomers.filter(item => item.customerNo.toLowerCase().includes(this.filter.customerNo.toLowerCase()));
					this.filterDescription = "No.";
					this.$store.state.filter.customerList.customerNo = this.filter.customerNo;
				}
				else {
					this.$store.state.filter.customerList.customerNo = "";
				}

				if(this.isFiltered("customerName")) {
					this.filteredCustomers = this.filteredCustomers.filter(item => item.customerName.toLowerCase().includes(this.filter.customerName.toLowerCase()));
					this.filterDescription += (this.filterDescription.length > 0 ? ", " : "") + "Name";
					this.$store.state.filter.customerList.customerName = this.filter.customerName;
				}
				else {
					this.$store.state.filter.customerList.customerName = "";
				}

				if(this.isFiltered("address")) {
					this.filteredCustomers = this.filteredCustomers.filter(item => item.address.toLowerCase().includes(this.filter.address.toLowerCase()));
					this.filterDescription += (this.filterDescription.length > 0 ? ", " : "") + "Address";
					this.$store.state.filter.customerList.address = this.filter.address;
				}
				else {
					this.$store.state.filter.customerList.address = "";
				}

				if(this.isFiltered("salesOrg")) {
					this.filteredCustomers = this.filteredCustomers.filter(item => undefined !== item.salesAreaData);
					this.filteredCustomers = this.filteredCustomers.filter(item => item.salesAreaData.some(area => area.salesOrg.toLowerCase().includes(this.filter.salesOrg.toLowerCase())));
					this.filterDescription += (this.filterDescription.length > 0 ? ", " : "") + "Sales Org.";
					this.$store.state.filter.customerList.salesOrg = this.filter.salesOrg;
				}
				else {
					this.$store.state.filter.customerList.salesOrg = "";
				}

				if(this.isFiltered("distributionChannel")) {
					this.filteredCustomers = this.filteredCustomers.filter(item => undefined !== item.salesAreaData);
					this.filteredCustomers = this.filteredCustomers.filter(item => item.salesAreaData.some(area => area.distributionChannel.toLowerCase().includes(this.filter.distributionChannel.toLowerCase())));
					this.filterDescription += (this.filterDescription.length > 0 ? ", " : "") + "Channel";
					this.$store.state.filter.customerList.distributionChannel = this.filter.distributionChannel;
				}
				else {
					this.$store.state.filter.customerList.distributionChannel = "";
				}

				if(this.isFiltered("division")) {
					this.filteredCustomers = this.filteredCustomers.filter(item => undefined !== item.salesAreaData);
					this.filteredCustomers = this.filteredCustomers.filter(item => item.salesAreaData.some(area => area.division.toLowerCase().includes(this.filter.division.toLowerCase())));
					this.filterDescription += (this.filterDescription.length > 0 ? ", " : "") + "Division";
					this.$store.state.filter.customerList.division = this.filter.division;
				}
				else {
					this.$store.state.filter.customerList.division = "";
				}
			},
			moveDetail(customerNo) {
				this.$router.push({
					name: "customerDetail",
					params: {
						customerNo: customerNo
					}
				});
			},
		},
	};
</script>
