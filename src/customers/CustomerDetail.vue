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
			<span v-if="isLoading" class="span span--org-skeletonbox">&nbsp;</span>
			<span v-else>{{ customerData.customerName }}</span>
		</div>
		<div class="div div--customer-listitem">
			<span v-if="isLoading" class="span span--org-skeletonbox">&nbsp;</span>
			<span v-else>{{ customerData.address }}</span>
		</div>
		<div class="div div--org-title">
			Sales Area Data
		</div>
		<div class="div">
			<div v-if="isLoading" class="div">
				<div class="div div--customer-listitem">
					<span class="span span--detail-attributename">Sales Area</span>
					<span class="span span--org-skeletonbox">&nbsp;</span>
				</div>
				<div class="div div--customer-listitem">
					<span class="span span--detail-attributename">Sales Office</span>
					<span class="span span--org-skeletonbox">&nbsp;</span>
				</div>
				<div class="div div--customer-listitem">
					<span class="span span--detail-attributename">Sales Group</span>
					<span class="span span--org-skeletonbox">&nbsp;</span>
				</div>
				<div class="div div--customer-listitem">
					<span class="span span--detail-attributename">Currency</span>
					<span class="span span--org-skeletonbox">&nbsp;</span>
				</div>
				<div class="div div--customer-listitem">
					<span class="span span--detail-attributename">Customer Pricing Procedure</span>
					<span class="span span--org-skeletonbox">&nbsp;</span>
				</div>
				<div class="div div--customer-listitem">
					<span class="span span--detail-attributename">Delivering Plant</span>
					<span class="span span--org-skeletonbox">&nbsp;</span>
				</div>
				<div class="div div--customer-listitem">
					<span class="span span--detail-attributename">Shipping Condition</span>
					<span class="span span--org-skeletonbox">&nbsp;</span>
				</div>
				<div class="div div--customer-listitem">
					<span class="span span--detail-attributename">Incoterms</span>
					<span class="span span--org-skeletonbox">&nbsp;</span>
				</div>
				<div class="div div--customer-listitem">
					<span class="span span--detail-attributename">Payment Terms</span>
					<span class="span span--org-skeletonbox">&nbsp;</span>
				</div>
				<div class="div div--customer-listitem">
					<span class="span span--detail-attributename">Credit Control Area</span>
					<span class="span span--org-skeletonbox">&nbsp;</span>
				</div>
			</div>
			<div class="div" v-else-if="undefined !== customerData.salesAreaData" v-for="(area, index) in customerData.salesAreaData" :key="index">
				<div class="div div--customer-listitem">
					<span class="span span--detail-attributename">Sales Area</span>
					<span class="span">{{ area.salesOrg }}/{{ area.distributionChannel }}/{{ area.division }}</span>
				</div>
				<div class="div div--customer-listitem">
					<span class="span span--detail-attributename">Sales Office</span>
					<span class="span">{{ area.salesOffice }}</span>
				</div>
				<div class="div div--customer-listitem">
					<span class="span span--detail-attributename">Sales Group</span>
					<span class="span">{{ area.salesGroup }}</span>
				</div>
				<div class="div div--customer-listitem">
					<span class="span span--detail-attributename">Currency</span>
					<span class="span">{{ area.currency }}</span>
				</div>
				<div class="div div--customer-listitem">
					<span class="span span--detail-attributename">Customer Pricing Procedure</span>
					<span class="span">{{ area.customerPricingProcedure }}</span>
				</div>
				<div class="div div--customer-listitem">
					<span class="span span--detail-attributename">Delivering Plant</span>
					<span class="span">{{ area.deliveringPlant }}</span>
				</div>
				<div class="div div--customer-listitem">
					<span class="span span--detail-attributename">Shipping Condition</span>
					<span class="span">{{ area.shippingCondition }}</span>
				</div>
				<div class="div div--customer-listitem">
					<span class="span span--detail-attributename">Incoterms</span>
					<span class="span">{{ area.incoterms }}</span>
				</div>
				<div class="div div--customer-listitem">
					<span class="span span--detail-attributename">Payment Terms</span>
					<span class="span">{{ area.paymentTerms }}</span>
				</div>
				<div class="div div--customer-listitem">
					<span class="span span--detail-attributename">Credit Control Area</span>
					<span class="span">{{ area.creditControlArea }}</span>
				</div>
			</div>
			<div class="div" v-else>
				<div class="div div--customer-listitem">
					None
				</div>
			</div>
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
	import Header from "@/Header.vue";
	import Navigation from "@/Navigation.vue";
	import Footer from "@/Footer.vue";
	import EventButtons from "@/EventButtons.vue";
	import Toaster from "@/Toaster.vue";
	import { popToast } from "@/Toaster.vue";
	import { CustomerDataHandler } from './CustomerDataHandler';
	import { log, confirmUpdateItem, confirmDeleteItem, confirmCreateItem } from "@/common.js";

	export default {
		data() {
			return {
				isLoading: true,
				corp: null,
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
		},
		created() {
			this.corp = this.$store.state.corp;
			this.customerNo = this.$route.params.customerNo;
			if("NEW" === this.selectedOrgCode) {
				this.isCreate = true;
				this.isLoading = false;
			}
		},
		async mounted() {
			if(!this.isCreate) {
				this.customerData = await CustomerDataHandler.getCustomer(this.$store.state.corp.id, this.customerNo);
				if(null === this.customerData) {
					popToast("WARNING", this.customerNo + " not found.", this.$store);
				}
				console.log(this.customerData);
				this.isLoading = false;	
			}
		},
		methods: {
			saveItem: async function() {
			},
			deleteItem: async function() {
			},
		}
	}
</script>