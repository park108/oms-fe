<template>
	<Header title="Product Manager" routeName="productList" />
	<main class="main">
		<section class="section section--list-filter">
			<button @click="toggleFilter">{{filterToggleButtonName}}</button>
			<div v-show="isFilterOpen">
				<div class="div div--listfilter-item">
					<label class="label label--list-filter" :class="{'label--filter-on': isFiltered('productNo')}" for="product-no">Product No.</label>
					<input class="input input--list-filter" type="input" id="product-no" v-model="filter.productNo" v-on:keyup="updateFilter('productNo')" />
				</div>
				<div class="div div--listfilter-item">
					<label class="label label--list-filter" :class="{'label--filter-on': isFiltered('productName')}" for="product-name">Product Name</label>
					<input class="input input--list-filter" type="input" id="product-name" v-model="filter.productName" v-on:keyup="updateFilter('productName')" />
				</div>
				<div class="div div--listfilter-item">
					<label class="label label--list-filter" :class="{'label--filter-on': isFiltered('division')}" for="division">Division</label>
					<select class="select select--list-filter" id="division" v-model="filter.division" @change="updateFilter('division')" >
						<option value="">All</option>
						<option value="51">51 - Battery</option>
						<option value="61">61 - Material</option>
					</select>
				</div>
				<div class="div div--listfilter-item">
					<label class="label label--list-filter" :class="{'label--filter-on': isFiltered('baseUnit')}" for="baseUnit">Base Unit</label>
					<input class="input input--list-filter" type="input" id="baseUnit" v-model="filter.baseUnit" v-on:keyup="updateFilter('baseUnit')"/>
				</div>
			</div>
		</section>
		<div class="div div--list-result">
			<span class="span span--list-result">
				Total: <span v-if="isLoading">...</span><span v-else>{{products.length}}</span> products
			</span>
			<span class="span span--list-result" v-if="filterDescription.length > 0">
				, Filtered: {{filteredProducts.length}} by {{filterDescription}}
			</span>
		</div>
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
				<tr class="tr tr--row-selectable" v-for="item in filteredProducts" :key="item.productNo" @click="moveDetail(item.productNo)">
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
	import Header from "@/common/Header.vue";
	import Corporation from "@/organizations/Corporation.vue";
	import Footer from "@/common/Footer.vue";
	import { log, isUuid } from "@/common/common.js"
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
					division: "",
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
			this.filter.productNo = this.$store.state.filter.productList.productNo;
			this.filter.productName = this.$store.state.filter.productList.productName;
			this.filter.division = this.$store.state.filter.productList.division;
			this.filter.baseUnit = this.$store.state.filter.productList.baseUnit;
		},
		async mounted() {
			this.products = await ProductDataHandler.getList(this.corp);

			if(null === this.products) {
				popToast("WARNING", "Customer data not found.", this.$store);
			}
			else {
				this.updateFilter();
				this.setFilterButton();
			}
			this.isLoading = false;
		},
		methods: {
			isFiltered(filterName) {
				return this.filter[filterName].length > 0;
			},
			setFilterButton() {
				this.filterToggleButtonName = this.isFilterOpen ? "Close"
					: this.isFiltered("productNo") || this.isFiltered("productName") || this.isFiltered("baseUnit") || this.isFiltered("division") ? "Filtered"
					: "Open";
			},
			toggleFilter() {
				this.isFilterOpen = !this.isFilterOpen;
				this.setFilterButton();
			},
			updateInputFilter(filterName, filterDescription) {
				if(this.isFiltered(filterName)) {
					this.filteredProducts = this.filteredProducts.filter(item => item[filterName].toLowerCase().includes(this.filter[filterName].toLowerCase()));
					this.filterDescription += (this.filterDescription.length > 0 ? ", " : "") + filterDescription;
					this.$store.state.filter.productList[filterName]= this.filter[filterName];
				}
				else {
					this.$store.state.filter.productList[filterName] = "";
				}
			},
			updateFilter(filterName) {
				this.filteredProducts = this.products;
				this.filterDescription = "";
				this.updateInputFilter("productNo", "No.");
				this.updateInputFilter("productName", "Name");
				this.updateInputFilter("division", "Division");
				this.updateInputFilter("baseUnit", "Base Unit");
			},
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
