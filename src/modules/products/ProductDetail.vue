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
		<div v-if="!isLoading && undefined !== productData.salesData" class="div">
			<div class="div div--main-title">
				Sales Data
			</div>
			<div v-if="1 < productData.salesData.length" class="div div--salesarea-selector">
				<button
					v-for="(data, index) in productData.salesData" :key="index"
					:id="'salesarea-button-' + index"
					:class="[
						'button',
						'button--salesarea-button',
						index === selectedSalesAreaIndex ? 'button--salesarea-selected' : '',
					]"
					@click="moveArea(index)"
				>
					{{ data.salesOrg + "/" + data.distributionChannel }}
				</button>
			</div>
			<section id="salesarea-panel" class="section section--salesarea-panel">
				<div class="div div--salesarea-panel" :id="'salesarea-index-' + index" v-for="(salesData, index) in productData.salesData" :key="index">
					<div class="div div--detail-listitem">
						<label for="salesOrg" class="label label--detail-attributename">Sales Org.</label>
						<OrgSelector name="salesOrg" apiUri="orgs" :selectedValue="salesData.salesOrg" :corpId="this.corpId" />
					</div>
					<div class="div div--detail-listitem">
						<label for="distributionChannel" class="label label--detail-attributename">Distribution Channel</label>
						<OrgSelector name="distributionChannel" apiUri="channels" :selectedValue="salesData.distributionChannel" :corpId="this.corpId" />
					</div>
					<AttInput name="salesUnit" attribute-name="Sales Unit" :value="salesData.salesUnit" :editable="true" />
				</div>
			</section>
		</div>
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
	import Header from "@/modules/common/Header.vue";
	import Navigation from "@/modules/common/Navigation.vue";
	import AttLoading from "@/modules/common/DetailAttributeLoading.vue";
	import AttInput from "@/modules/common/DetailAttributeInput.vue";
	import Footer from "@/modules/common/Footer.vue";
	import EventButtons from "@/modules/common/EventButtons.vue";
	import Toaster from "@/modules/common/Toaster.vue";
	import OrgSelector from "@/modules/organizations/OrgSelector.vue";
	import { popToast } from "@/modules/common/Toaster.vue";
	import { isUuid, log, confirmUpdateItem, confirmDeleteItem, confirmCreateItem } from "@/modules/common/common.js";
	import { ProductDataHandler } from "@/modules/products/ProductDataHandler.js";

	export default {
		data() {
			return {
				isLoading: true,
				corpId: "",
				isPending: false,
				isCreate: false,
				selectedSalesAreaIndex: 0,
				salesAreaLeftPadding: 0,
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
				log("INFO", "save product");
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
			moveArea: function(index) {
				if(0 === this.salesAreaLeftPadding) {
					const objectRect0 = document.getElementById("salesarea-index-0").getBoundingClientRect();
					this.salesAreaLeftPadding = objectRect0.x;
				}
				const objectRect = document.getElementById("salesarea-index-" + index).getBoundingClientRect();
				this.selectedSalesAreaIndex = index;
				document.getElementById("salesarea-panel").scrollTo(objectRect.x - this.salesAreaLeftPadding, objectRect.y);
			},
		}
	}
</script>