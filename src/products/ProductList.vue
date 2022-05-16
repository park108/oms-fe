<template>
	<Header title="Product Manager" routeName="productList" />
	<main class="main">
		<div class="div div--table-box">
			<table class="table table--main-list" v-if="isLoading">
				<tr class="tr tr--row-header">
					<th class="th">No.</th>
					<th class="th">Name</th>
					<th class="th">Division</th>
					<th class="th">Base Unit</th>
				</tr>
				<tr class="tr tr--row-selectable" v-for="index in 10" :key="index">
					<td class="td td--col-product td--list-loading"><span class="span span--detail-skeleton">&nbsp;</span></td>
					<td class="td td--col-product td--list-loading"><span class="span span--detail-skeleton">&nbsp;</span></td>
					<td class="td td--col-product td--list-loading"><span class="span span--detail-skeleton">&nbsp;</span></td>
					<td class="td td--col-product td--list-loading"><span class="span span--detail-skeleton">&nbsp;</span></td>
				</tr>
			</table>
			<table class="table table--main-list" v-else>
				<tr class="tr tr--row-header">
					<th class="th">No.</th>
					<th class="th">Name</th>
					<th class="th">Division</th>
					<th class="th">Base Unit</th>
				</tr>
				<tr class="tr tr--row-selectable" v-for="item in products" :key="item.productNo" @click="moveDetail(item.productNo)">
					<td class="td td--col-product">{{item.productNo}}</td>
					<td class="td td--col-product">{{item.productName}}</td>
					<td class="td td--col-product">{{item.division}}</td>
					<td class="td td--col-product">{{item.baseUnit}}</td>
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
	import { ProductDataHandler } from "@/products/ProductDataHandler.js";

	export default {
		data() {
			return {
				isLoading: true,
				isFilterOpen: false,
				filterDescription: "",
				filterToggleButtonName: "Open",
				filter: {
					productNo: "",
					productName: "",
					baseUnit: "",
				},
				corpId: String,
				products: [],
				filteredProducts: [],
			}
		},
		components: {
			Header,
			Corporation,
			Footer,
		},
		created() {
			this.corpId = sessionStorage.getItem("corpId");
			if(undefined === this.corpId || !isUuid(this.corpId)) {
				this.$router.push({name: "Index"});
			}

			document.title = "Product Manager - OMS";
			// this.filter.customerNo = this.$store.state.filter.customerList.customerNo;
			// this.filter.customerName = this.$store.state.filter.customerList.customerName;
			// this.filter.address = this.$store.state.filter.customerList.address;
			// this.filter.salesOrg = this.$store.state.filter.customerList.salesOrg;
			// this.filter.distributionChannel = this.$store.state.filter.customerList.distributionChannel;
			// this.filter.division = this.$store.state.filter.customerList.division;
		},
		async mounted() {
			this.products = await ProductDataHandler.getList(this.corp);

			if(null === this.products) {
				popToast("WARNING", "Customer data not found.", this.$store);
			}
			else {
				// this.updateFilter();
				// this.setFilterButton();
			}
			this.isLoading = false;
		},
		methods: {
			// isFiltered(filterName) {
			// 	return this.filter[filterName].length > 0;
			// },
			// setFilterButton() {
			// 	this.filterToggleButtonName = this.isFilterOpen ? "Close"
			// 		: this.isFiltered("customerNo") || this.isFiltered("customerName") || this.isFiltered("address") ? "Filtered"
			// 		: "Open";
			// },
			// toggleFilter() {
			// 	this.isFilterOpen = !this.isFilterOpen;
			// 	this.setFilterButton();
			// },
			// updateInputFilter(filterName, filterDescription) {
			// 	if(this.isFiltered(filterName)) {
			// 		this.filteredCustomers = this.filteredCustomers.filter(item => item[filterName].toLowerCase().includes(this.filter[filterName].toLowerCase()));
			// 		this.filterDescription += (this.filterDescription.length > 0 ? ", " : "") + filterDescription;
			// 		this.$store.state.filter.customerList[filterName]= this.filter[filterName];
			// 	}
			// 	else {
			// 		this.$store.state.filter.customerList[filterName] = "";
			// 	}
			// },
			// updateSelectFilter(filterName, filterDescription, listName) {
			// 	if(this.isFiltered(filterName)) {
			// 		this.filteredCustomers = this.filteredCustomers.filter(item => undefined !== item[listName]);
			// 		this.filteredCustomers = this.filteredCustomers.filter(item => item[listName].some(c => c.division.toLowerCase().includes(this.filter.division.toLowerCase())));
			// 		this.filterDescription += (this.filterDescription.length > 0 ? ", " : "") + filterDescription;
			// 		this.$store.state.filter.customerList[filterName]= this.filter[filterName];
			// 	}
			// 	else {
			// 		this.$store.state.filter.customerList[filterName] = "";
			// 	}
			// },
			// updateFilter(filterName) {
			// 	this.filteredCustomers = this.customers;
			// 	this.filterDescription = "";
			// 	this.updateInputFilter("customerNo", "No.");
			// 	this.updateInputFilter("customerName", "Name");
			// 	this.updateInputFilter("address", "Address");
			// 	this.updateSelectFilter("salesOrg", "Sales Org.", "salesAreaData");
			// 	this.updateSelectFilter("distributionChannel", "Channel", "salesAreaData");
			// 	this.updateSelectFilter("division", "Name", "salesAreaData");
			// },
			moveDetail(productNo) {
				this.$router.push({
					name: "productDetail",
					params: {
						productNo: productNo
					}
				});
			},
		},
	};
</script>
