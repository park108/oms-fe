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
					<label class="label label--list-filter" :class="{'label--filter-on': customerNo.length > 0}" for="customer-no">Customer No.</label>
					<input class="input input--list-filter" type="input" id="customer-no" v-model="customerNo" v-on:keyup="updateFilter('customerNo')" />
				</div>
				<div class="div div--listfilter-item">
					<label class="label label--list-filter" :class="{'label--filter-on': customerName.length > 0}" for="customer-name">Customer Name</label>
					<input class="input input--list-filter" type="input" id="customer-name" v-model="customerName" v-on:keyup="updateFilter('customerName')" />
				</div>
				<div class="div div--listfilter-item">
					<label class="label label--list-filter" :class="{'label--filter-on': address.length > 0}" for="address">Address</label>
					<input class="input input--list-filter" type="input" id="address" v-model="address" v-on:keyup="updateFilter('address')"/>
				</div>
				<div class="div div--listfilter-item">
					<label class="label label--list-filter" for="sales-org">Sales Org.</label>
					<select class="select select--list-filter" id="sales-org">
						<option value="">All</option>
						<option value="S000">S000 - Battery</option>
						<option value="S100">S100 - Material</option>
					</select>
				</div>
				<div class="div div--listfilter-item">
					<label class="label label--list-filter" for="distribution-channel">Distribution Channel</label>
					<select class="select select--list-filter" id="distribution-channel">
						<option value="">All</option>
						<option value="20">20 - Domestic</option>
						<option value="40">40 - Export</option>
					</select>
				</div>
				<div class="div div--listfilter-item">
					<label class="label label--list-filter" for="division">Division</label>
					<select class="select select--list-filter" id="division">
						<option value="">All</option>
						<option value="51">51 - Battery</option>
						<option value="61">61 - Material</option>
					</select>
				</div>
			</div>
		</section>
		<div class="div div--list-result">
			<span class="span span--list-result">Total: {{customers.length}} customers</span>
			<span class="span span--list-result" v-if="filterDescription.length > 0">, Filtered: {{filteredCustomers.length}} by {{filterDescription}}</span>
		</div>
		<section class="section section--table-box">
			<table class="table table--main-list">
				<tr class="tr tr--row-header">
					<th class="th">No.</th>
					<th class="th">Name</th>
					<th class="th">Address</th>
				</tr>
				<tr class="tr tr--row-selectable" v-for="item in filteredCustomers" :key="item.customerNo">
					<td class="td td--customer-no">{{item.customerNo}}</td>
					<td class="td td--customer-name">{{item.customerName}}</td>
					<td class="td td--customer-address">{{item.address}}</td>
				</tr>
			</table>
		</section>
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
				filterToggleButtonName: "Filter Open",
				customerNo: "",
				customerName: "",
				address: "",
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
		watch: {
			corpId: async function () {
				if(isUuid(this.corpId)) {
					// TODO: Get customer list initializing time
					this.customers = await CustomerDataHandler.getList(this.corp);
					this.filteredCustomers = this.customers;
					if(null === this.customers) {
						popToast("WARNING", "Customer data not found.", this.$store);
					}
					this.isLoading = false;
				}
			},
		},
		methods: {
			setCorpId(value) {
				this.corpId = value;
			},
			toggleFilter() {
				this.isFilterOpen = !this.isFilterOpen;
				this.filterToggleButtonName = this.isFilterOpen ? "Filter Close" : "Filter Open";
			},
			updateFilter(filterName) {
				const hasCustomerNoFilter = this.customerNo.length > 0;
				const hasCustomerNameFilter = this.customerName.length > 0;
				const hasAddressFilter = this.address.length > 0;

				this.filteredCustomers = this.customers;
				this.filterDescription = "";
				
				if(hasCustomerNoFilter) {
					this.filteredCustomers = this.filteredCustomers.filter(item => item.customerNo.toLowerCase().includes(this.customerNo.toLowerCase()));
					this.filterDescription = "No.";
				}

				if(hasCustomerNameFilter) {
					this.filteredCustomers = this.filteredCustomers.filter(item => item.customerName.toLowerCase().includes(this.customerName.toLowerCase()));
					this.filterDescription += (this.filterDescription.length > 0 ? ", " : "") + "Name";
				}

				if(hasAddressFilter) {
					this.filteredCustomers = this.filteredCustomers.filter(item => item.address.toLowerCase().includes(this.address.toLowerCase()));
					this.filterDescription += (this.filterDescription.length > 0 ? ", " : "") + "Address";
				}
			},
		},
	};
</script>
