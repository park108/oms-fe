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
				<tr class="tr tr--row-selectable" v-for="item in filteredCustomers" :key="item.customerNo">
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
		created() {
			document.title = "Customer Manager - OMS";
			this.customerNo = this.$store.state.filter.customerList.customerNo;
			this.customerName = this.$store.state.filter.customerList.customerName;
			this.address = this.$store.state.filter.customerList.address;
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
				return this[filterName].length > 0;
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
					this.filteredCustomers = this.filteredCustomers.filter(item => item.customerNo.toLowerCase().includes(this.customerNo.toLowerCase()));
					this.filterDescription = "No.";
					this.$store.state.filter.customerList.customerNo = this.customerNo;
				}
				else {
					this.$store.state.filter.customerList.customerNo = "";
				}

				if(this.isFiltered("customerName")) {
					this.filteredCustomers = this.filteredCustomers.filter(item => item.customerName.toLowerCase().includes(this.customerName.toLowerCase()));
					this.filterDescription += (this.filterDescription.length > 0 ? ", " : "") + "Name";
					this.$store.state.filter.customerList.customerName = this.customerName;
				}
				else {
					this.$store.state.filter.customerList.customerName = "";
				}

				if(this.isFiltered("address")) {
					this.filteredCustomers = this.filteredCustomers.filter(item => item.address.toLowerCase().includes(this.address.toLowerCase()));
					this.filterDescription += (this.filterDescription.length > 0 ? ", " : "") + "Address";
					this.$store.state.filter.customerList.address = this.address;
				}
				else {
					this.$store.state.filter.customerList.address = "";
				}
			},
		},
	};
</script>
