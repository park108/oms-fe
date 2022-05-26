<template>
	<div class="div div--salesarea-panel" :id="'salesarea-index-' + index" v-for="(area, index) in salesAreaData" :key="index">
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
	</div>
</template>
<script>
	import CustomerDetailInput from "./CustomerDetailInput.vue";
	import OrgSelector from "@/organizations/OrgSelector.vue";
	import CodeSelector from "@/common/CodeSelector.vue";

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
		props: {
			salesAreaData: Array,
		},
		components: {
			CustomerDetailInput,
			OrgSelector,
			CodeSelector,
		},
		created() {
		},
		mounted() {
		},
		methods: {
		},
	}
</script>