<template>
	<Header title="Customer Manager" routeName="customerList" />
	<Navigation
		prevName="Customer List"
		:enableDelete="!isCreate"
		:deleteEventFunc="deleteItem"
	/>
	<main class="main">
		<div class="div div--org-title">{{ customerNo }}</div>
		<div class="div div--org-title">		
			<span v-if="isLoading" class="span span--detail-skeleton">&nbsp;</span>
			<span v-else>{{ customerData.customerName }}</span>
		</div>
		<div class="div div--detail-listitem">
			<span v-if="isLoading" class="span span--detail-skeleton">&nbsp;</span>
			<span v-else>{{ customerData.address }}</span>
		</div>
		<div class="div div--org-title">
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
		<section class="section" v-else-if="undefined !== customerData.salesAreaData" v-for="(area, index) in customerData.salesAreaData" :key="index">
			<div class="div div--detail-listitem">
				<label for="salesOrg" class="label label--detail-attributename">Sales Org.</label>
				<OrgSelector name="salesOrg" apiUri="orgs" :selectedValue="area.salesOrg" :corpId="this.corpId" />
			</div>
			<div class="div div--detail-listitem">
				<label for="distributionChannel" class="label label--detail-attributename">Distribution Channel</label>
				<OrgSelector name="distributionChannel" apiUri="channels" :selectedValue="area.distributionChannel" :corpId="this.corpId" />
			</div>
			<div class="div div--detail-listitem">
				<label for="division" class="label label--detail-attributename">Division</label>
				<OrgSelector name="division" apiUri="divs" :selectedValue="area.division" :corpId="this.corpId" />
			</div>
			<div class="div div--detail-listitem">
				<label for="salesOffice" class="label label--detail-attributename">Sales Office</label>
				<OrgSelector name="salesOffice" apiUri="offices" :selectedValue="area.salesOffice" :corpId="this.corpId" />
			</div>
			<div class="div div--detail-listitem">
				<label for="salesGroup" class="label label--detail-attributename">Sales Group</label>
				<OrgSelector name="salesGroup" apiUri="groups" :selectedValue="area.salesGroup" :corpId="this.corpId" />
			</div>
			<CustomerDetailInput attributeName="Currency" name="salesOcurrencyffice" :value="area.currency" />
			<CustomerDetailInput attributeName="Customer Pricing Procedure" name="customerPricingProcedure" :value="area.customerPricingProcedure" />
			<CustomerDetailInput attributeName="Delivering Plant" name="deliveringPlant" :value="area.deliveringPlant" />
			<CustomerDetailInput attributeName="Shipping Condition" name="shippingCondition" :value="area.shippingCondition" />
			<CustomerDetailInput attributeName="Incoterms" name="incoterms" :value="area.incoterms" />
			<CustomerDetailInput attributeName="Payment Terms" name="paymentTerms" :value="area.paymentTerms" />
			<CustomerDetailInput attributeName="Credit Control Area" name="creditControlArea" :value="area.creditControlArea" />
		</section>
		<section class="section" v-else>
			<div class="div div--detail-listitem">
				None
			</div>
		</section>
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
	import Header from "@/Header.vue";
	import Navigation from "@/Navigation.vue";
	import Footer from "@/Footer.vue";
	import EventButtons from "@/EventButtons.vue";
	import Toaster from "@/Toaster.vue";
	import CustomerDetailInput from "./CustomerDetailInput.vue";
	import OrgSelector from "@/organizations/OrgSelector.vue";
	import { popToast } from "@/Toaster.vue";
	import { CustomerDataHandler } from './CustomerDataHandler';
	import { isUuid, log, confirmUpdateItem, confirmDeleteItem, confirmCreateItem } from "@/common.js";

	export default {
		data() {
			return {
				isLoading: true,
				corpId: "",
				isPending: false,
				isCreate: false,
				customerNo: '',
				customerData: null,
			}
		},
		components: {
			Header,
			Navigation,
			Footer,
			EventButtons,
			Toaster,
			CustomerDetailInput,
			OrgSelector,
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
				console.log(this.customerData);
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
		}
	}
</script>