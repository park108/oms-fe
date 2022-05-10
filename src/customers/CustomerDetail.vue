<template>
	<Header title="Customer Manager" routeName="customerList" />
	<Navigation
		prevName="Customer List"
		:enableDelete="!isCreate"
		:deleteEventFunc="deleteItem"
	/>
	<main class="main">
		<div class="div div--org-title">			
			<span v-if="isLoading" class="span span--org-skeletonbox">&nbsp;</span>
			<span v-else>{{ customerNo }} {{ customerData.customerName }}</span>
		</div>
		<div class="div">
			<span v-if="isLoading" class="span span--org-skeletonbox">&nbsp;</span>
			<span v-else>Address: {{ customerData.address }}</span>
		</div>
		<div class="div">
			<h2 class="h2"><span v-if="isLoading" class="span span--org-skeletonbox">&nbsp;</span></h2>
			<span v-if="isLoading" class="span span--org-skeletonbox">&nbsp;</span>
			<div class="div" v-else-if="undefined !== customerData.salesAreaData">
				<h2 class="h2">Sales Area Data</h2>
				<div class="div" v-for="(area, index) in customerData.salesAreaData" :key="index">
					<div class="div">Sales Area: {{ area.salesOrg }}/{{ area.distributionChannel }}/{{ area.division }}</div>
					<div class="div">Sales Office: {{ area.salesOffice }}</div>
					<div class="div">Sales Group: {{ area.salesGroup }}</div>
					<div class="div">Currency: {{ area.currency }}</div>
					<div class="div">Customer Pricing Procedure: {{ area.customerPricingProcedure }}</div>
					<div class="div">Delivering Plant: {{ area.deliveringPlant }}</div>
					<div class="div">Shipping Condition: {{ area.shippingCondition }}</div>
					<div class="div">Incoterms: {{ area.incoterms }}</div>
					<div class="div">Payment Terms: {{ area.paymentTerms }}</div>
					<div class="div">Credit Control Area: {{ area.creditControlArea }}</div>
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