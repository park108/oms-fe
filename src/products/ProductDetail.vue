<template>
	<Header title="Product Manager" routeName="productList" />
	<Navigation
		prevName="Product List"
		:enableDelete="!isCreate"
		:deleteEventFunc="deleteItem"
	/>
	<main class="main">
		<div class="div div--main-title">{{ productNo }}</div>
		<div class="div div--main-title">		
			<span v-if="isLoading" class="span span--detail-skeleton">&nbsp;</span>
			<span v-else class="span">{{ productData.productName }}</span>
		</div>
		<AttInput name="productNo" attribute-name="Product No." :value="productNo" :editable="isCreate&&!isPending" />
		<AttLoading v-if="isLoading" attribute-name="Product Name" />
		<AttInput v-else name="productName" attribute-name="Product Name" :value="productData.productName" :editable="!isPending" />
		<AttLoading v-if="isLoading" attribute-name="Division" />
		<div v-else  class="div div--detail-listitem">
			<label for="division" class="label label--detail-attributename">Division</label>
			<OrgSelector name="division" apiUri="divs" :selectedValue="productData.division" :corpId="this.corpId" />
		</div>
		<AttLoading v-if="isLoading" attribute-name="Base Unit" />
		<AttInput v-else name="baseUnit" attribute-name="Base Unit" :value="productData.baseUnit" :editable="!isPending" />
		<Toaster />
	</main>
	<EventButtons
		:enableSave="true"
		:saveEventFunc="saveItem"
		:saveButtonText="isCreate ? 'Create Product' : 'Update Product'"
	/>
	<Footer />
</template>
<script>
	import Header from "@/common/Header.vue";
	import Navigation from "@/common/Navigation.vue";
	import AttLoading from "@/common/DetailAttributeLoading.vue";
	import AttInput from "@/common/DetailAttributeInput.vue";
	import Footer from "@/common/Footer.vue";
	import EventButtons from "@/common/EventButtons.vue";
	import Toaster from "@/common/Toaster.vue";
	import OrgSelector from "@/organizations/OrgSelector.vue";
	import { popToast } from "@/common/Toaster.vue";
	import { isUuid, log, confirmUpdateItem, confirmDeleteItem, confirmCreateItem } from "@/common/common.js";
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
			AttLoading,
			AttInput,
			OrgSelector,
			Footer,
			EventButtons,
			Toaster,
		},
		created() {
			this.corpId = sessionStorage.getItem("corpId");
			if(undefined === this.corpId || !isUuid(this.corpId)) {
				this.$router.push({name: "Index"});
			}

			document.title = "Product Manager - OMS";

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
				if(!confirmUpdateItem("product " + this.productNo)) return;
				log("save product");
			},
			deleteItem: async function() {
				if(!confirmDeleteItem("product " + this.productNo)) return;

				const res = await ProductDataHandler.deleteProduct(this.corpId, {
					productNo: this.productNo,
				});

				if(true === res.isSuccess) {
					popToast("SUCCESS",  "A product " + this.productNo + " is deleted.", this.$store);
					this.isPending = true;
					setTimeout(() => this.$router.go(-1), 2000);
				}
				else {
					popToast("ERROR", "Server Error. Please contact administrator.", this.$store);
				}
			},
		}
	}
</script>