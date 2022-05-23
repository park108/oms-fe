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
				<OrgSelector name="salesOffice" apiUri="offices" :selectedValue="area.salesOffice" :corpId="this.corpId" :disabled="false" />
			</div>
			<div class="div div--detail-listitem">
				<label for="salesGroup" class="label label--detail-attributename">Sales Group</label>
				<OrgSelector name="salesGroup" apiUri="groups" :selectedValue="area.salesGroup" :corpId="this.corpId" :disabled="false" />
			</div>
			<div class="div div--detail-listitem">
				<label for="currency" class="label label--detail-attributename">Currency</label>
				<CodeSelector name="currency" apiUri="currencies" :corpId="corpId" :selectedValue="area.currency" :disabled="false" />
			</div>
			<CustomerDetailInput attributeName="Customer Pricing Procedure" name="customerPricingProcedure" :value="area.customerPricingProcedure" :editable="true" />
			<CustomerDetailInput attributeName="Delivering Plant" name="deliveringPlant" :value="area.deliveringPlant" :editable="true" />
			<CustomerDetailInput attributeName="Shipping Condition" name="shippingCondition" :value="area.shippingCondition" :editable="true" />
			<CustomerDetailInput attributeName="Incoterms" name="incoterms" :value="area.incoterms" :editable="true" />
			<CustomerDetailInput attributeName="Payment Terms" name="paymentTerms" :value="area.paymentTerms" :editable="true" />
			<CustomerDetailInput attributeName="Credit Control Area" name="creditControlArea" :value="area.creditControlArea" :editable="true" />
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
	import Header from "@/common/Header.vue";
	import Navigation from "@/common/Navigation.vue";
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
		}
	}
</script>