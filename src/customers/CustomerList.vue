<template>
	<Header title="Customer Manager" routeName="customerList" />
	<main class="main">
		<section class="section section--split-one">
			<Corporation @setCorpId="setCorpId" />
		</section>
		<section class="section section--list-filter">
			<div class="div div--listfilter-item">
				<label class="label label--list-filter" for="customerNo">Customer No.</label>
				<input class="input input--list-filter" type="input" name="customerNo"/>
			</div>
			<div class="div div--listfilter-item">
				<label class="label label--list-filter" for="customerName">Customer Name</label>
				<input class="input input--list-filter" type="input" name="customerName"/>
			</div>
			<div class="div div--listfilter-item">
				<label class="label label--list-filter" for="customerName">Address</label>
				<input class="input input--list-filter" type="input" name="address"/>
			</div>
			<div class="div div--listfilter-item">
				<label class="label label--list-filter" for="salesOrg">Sales Org.</label>
				<select class="select select--list-filter" name="salesOrg">
					<option value="">All</option>
					<option value="S000">S000 - Battery</option>
					<option value="S100">S100 - Material</option>
				</select>
			</div>
			<div class="div div--listfilter-item">
				<label class="label label--list-filter" for="distributionChannel">Distribution Channel</label>
				<select class="select select--list-filter" name="distributionChannel">
					<option value="">All</option>
					<option value="20">20 - Domestic</option>
					<option value="40">40 - Export</option>
				</select>
			</div>
			<div class="div div--listfilter-item">
				<label class="label label--list-filter" for="division">Division</label>
				<select class="select select--list-filter" name="division">
					<option value="">All</option>
					<option value="51">51 - Battery</option>
					<option value="61">61 - Material</option>
				</select>
			</div>
			<button class="button button--filter-apply">Apply Filter</button>
		</section>
		<table class="table table--main-list">
			<tr class="tr tr--row-header">
				<th class="th">No.</th>
				<th class="th">Name</th>
				<th class="th">Address</th>
			</tr>
			<tr class="tr tr--row-selectable" v-for="item in customers" :key="item.customerNo">
				<td class="td">{{item.customerNo}}</td>
				<td class="td">{{item.customerName}}</td>
				<td class="td">{{item.address}}</td>
			</tr>
		</table>
	</main>
	<Footer />
</template>
<script>
	import Header from "@/Header.vue";
	import Corporation from "@/Corporation.vue";
	import Footer from "@/Footer.vue";
	import { isUuid } from "@/common.js"
	import { CustomerDataHandler } from "@/customers/CustomerDataHandler.js";

	export default {
		data() {
			return {
				isLoading: true,
				corpId: String,
				customers: [],
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
			}
		},
	};
</script>
