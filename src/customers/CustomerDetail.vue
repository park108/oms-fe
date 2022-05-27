<template>
	<Header title="Customer Manager" routeName="customerList" />
	<Navigation
		prevName="Customer List"
		:enableDelete="!isCreate"
		:deleteEventFunc="deleteItem"
	/>
	<main class="main">
		<div class="div div--main-title">{{ customerNo }}</div>
		<div class="div div--main-title">
			<span v-if="isLoading" class="span span--detail-skeleton">&nbsp;</span>
			<span class="span" v-else>{{ customerData.customerName }}</span>
		</div>
		<div class="div div--detail-listitem">
			<span v-if="isLoading" class="span span--detail-skeleton">&nbsp;</span>
			<label v-if="!isLoading" for="country" class="label label--detail-attributename">Country</label>
			<CodeSelector v-if="!isLoading" name="country" apiUri="countries" :corpId="corpId" :selectedValue="customerData.country" :disabled="false" />
		</div>
		<div v-if="isLoading" class="div div--detail-listitem">
			<span class="span span--detail-skeleton">&nbsp;</span>
		</div>
		<CustomerDetailInput v-if="!isLoading" attributeName="Address" name="address" :value="customerData.address" :editable="true" />
		<div class="div div--main-title">
			Sales Area Data
		</div>
		<section v-if="isLoading" class="section">
			<CustomerDetailInput :isLoading="true" attributeName="Sales Org." />
			<CustomerDetailInput :isLoading="true" attributeName="Distribution Channel" />
			<CustomerDetailInput :isLoading="true" attributeName="Division" />
			<CustomerDetailInput :isLoading="true" attributeName="Sales Office" />
			<CustomerDetailInput :isLoading="true" attributeName="Sales Group" />
			<CustomerDetailInput :isLoading="true" attributeName="Currency" />
			<CustomerDetailInput :isLoading="true" attributeName="Customer Pricing Procedure" />
			<CustomerDetailInput :isLoading="true" attributeName="Delivering Plant" />
			<CustomerDetailInput :isLoading="true" attributeName="Shipping Condition" />
			<CustomerDetailInput :isLoading="true" attributeName="Incoterms" />
			<CustomerDetailInput :isLoading="true" attributeName="Payment Terms" />
			<CustomerDetailInput :isLoading="true" attributeName="Credit Control Area" />
		</section>
		<section v-else-if="undefined === customerData.salesAreaData" class="section">
			<div class="div div--detail-listitem">
				None
			</div>
		</section>
		<div v-else class="div">
			<div v-if="1 < customerData.salesAreaData.length" class="div div--salesarea-selector">
				<button
					v-for="(area, index) in customerData.salesAreaData" :key="index"
					:id="'salesarea-button-' + index"
					:class="[
						'button',
						'button--salesarea-button',
						index === selectedSalesAreaIndex ? 'button--salesarea-selected' : '',
					]"
					@click="moveArea(index)"
				>
					{{ area.salesOrg + "/" + area.distributionChannel + "/" + area.division }}
				</button>
			</div>
			<section id="salesarea-panel" class="section section--salesarea-panel">
				<CustomerDetailSalesArea :salesAreaData="customerData.salesAreaData" />
			</section>
		</div>
		<Toaster />
	</main>
	<EventButtons
		:enableSave="true"
		:saveEventFunc="saveItem"
		:saveButtonText="isCreate ? 'Create Customer' : 'Update Customer'"
	/>
	<Footer />
</template>
<script>
	import Header from "@/common/Header.vue";
	import Navigation from "@/common/Navigation.vue";
	import CustomerDetailSalesArea from "./CustomerDetailSalesArea.vue";
	import Footer from "@/common/Footer.vue";
	import EventButtons from "@/common/EventButtons.vue";
	import Toaster from "@/common/Toaster.vue";
	import CustomerDetailInput from "./CustomerDetailInput.vue";
	import OrgSelector from "@/organizations/OrgSelector.vue";
	import CodeSelector from "@/common/CodeSelector.vue";
	import { popToast } from "@/common/Toaster.vue";
	import { CustomerDataHandler } from './CustomerDataHandler';
	import { isUuid, log, confirmUpdateItem, confirmDeleteItem, confirmCreateItem } from "@/common/common.js";

	export default {
		data() {
			return {
				isLoading: true,
				corpId: "",
				isPending: false,
				isCreate: false,
				selectedSalesAreaIndex: 0,
				customerNo: '',
				customerData: null,
				salesAreaLeftPadding: 0,
			}
		},
		components: {
			Header,
			Navigation,
			CustomerDetailSalesArea,
			Footer,
			EventButtons,
			Toaster,
			CustomerDetailInput,
			OrgSelector,
			CodeSelector,
		},
		created() {
			this.corpId = sessionStorage.getItem("corpId");
			if(undefined === this.corpId || !isUuid(this.corpId)) {
				this.$router.push({name: "Index"});
			}

			this.customerNo = this.$route.params.customerNo;
			if("NEW" === this.selectedOrgCode) {
				this.isCreate = true;
				this.isLoading = false;
			}
		},
		async mounted() {
			if(!this.isCreate) {
				this.customerData = await CustomerDataHandler.getCustomer(this.corpId, this.customerNo);
				if(null === this.customerData) {
					popToast("WARNING", this.customerNo + " not found.", this.$store);
				}
				this.isLoading = false;	
			}
		},
		methods: {
			saveItem: async function() {
				if(!confirmUpdateItem("Customer")) return;
				log("save customer");
			},
			deleteItem: async function() {
				if(!confirmDeleteItem("Customer")) return;
				log("delete customer");
			},
			moveArea: function(index) {
				if(0 === this.salesAreaLeftPadding) {
					const objectRect0 = document.getElementById("salesarea-index-0").getBoundingClientRect();
					this.salesAreaLeftPadding = objectRect0.x;
				}
				const objectRect = document.getElementById("salesarea-index-" + index).getBoundingClientRect();
				this.selectedSalesAreaIndex = index;
				document.getElementById("salesarea-panel").scrollTo(objectRect.x - this.salesAreaLeftPadding, objectRect.y);
			}
		}
	}
</script>