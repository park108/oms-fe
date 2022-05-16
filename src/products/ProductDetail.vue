<template>
	<Header title="Product Manager" routeName="productList" />
	<Navigation
		prevName="Product List"
		:enableDelete="!isCreate"
		:deleteEventFunc="deleteItem"
	/>
	<main class="main">
		<div class="div div--org-title">{{ productNo }}</div>
		<div class="div div--org-title">		
			<span v-if="isLoading" class="span span--detail-skeleton">&nbsp;</span>
			<span v-else>{{ productData.productName }}</span>
		</div>
		<div class="div div--detail-listitem">
			<label for="division" class="label label--detail-attributename">Division</label>
			<span v-if="isLoading" class="span span--detail-skeleton">&nbsp;</span>
			<OrgSelector v-else name="division" apiUri="divs" :selectedValue="productData.division" :corpId="this.corpId" />
		</div>
		<div class="div div--detail-listitem">
			<label for="baseUnit" class="label label--detail-attributename">Base Unit</label>
			<span v-if="isLoading" class="span span--detail-skeleton">&nbsp;</span>
			<span v-else>{{ productData.baseUnit }}</span>
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
	import OrgSelector from "@/organizations/OrgSelector.vue";
	import { popToast } from "@/Toaster.vue";
	import { isUuid, log, confirmUpdateItem, confirmDeleteItem, confirmCreateItem } from "@/common.js";
	import { ProductDataHandler } from "@/products/ProductDataHandler.js";

	export default {
		data() {
			return {
				isLoading: true,
				corpId: "",
				isPending: false,
				isCreate: false,
				productNo: '',
				productData: null,
			}
		},
		components: {
			Header,
			Navigation,
			Footer,
			EventButtons,
			Toaster,
			OrgSelector,
		},
		created() {
			this.corpId = sessionStorage.getItem("corpId");
			if(undefined === this.corpId || !isUuid(this.corpId)) {
				this.$router.push({name: "Index"});
			}

			this.productNo = this.$route.params.productNo;
			if("NEW" === this.selectedOrgCode) {
				this.isCreate = true;
				this.isLoading = false;
			}
		},
		async mounted() {
			if(!this.isCreate) {
				this.productData = await ProductDataHandler.getProduct(this.corpId, this.productNo);
				if(null === this.productData) {
					popToast("WARNING", this.productNo + " not found.", this.$store);
				}
				this.isLoading = false;	
			}
		},
		methods: {
			saveItem: async function() {
				if(!confirmUpdateItem("Product")) return;
				log("save product");
			},
			deleteItem: async function() {
				if(!confirmDeleteItem("Product")) return;
				log("delete product");
			},
		}
	}
</script>