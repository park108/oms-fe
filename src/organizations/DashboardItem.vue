<template>
	<section class="section section--dashboard-linktodetail"
		:class="{
			'section--split-one': isSplitOne,
			'section--split-two': isSplitTwo,
			'section--split-three': isSplitThree,
		}"
		@click="moveList"
	>
		<div class="div div--dashboard-item">
			<h1 class="h1 h1--dashboard-skeleton" v-if="isLoading">LOADING</h1>
			<h1 class="h1" v-else >{{ orgDesc }}</h1>
			<hr class="hr" />
			<OrgLoading v-if="isLoading" />
			<div class="div div--org-listitem" v-else v-for="orgItem in list" :key="orgItem.id">
				<span class="span">{{ orgItem[orgName] }}</span>
				<span class="span"> - </span>
				<span class="span">{{ orgItem[orgName + "Desc" ] }}</span>
			</div>
		</div>
	</section>
</template>
<script>
	import OrgLoading from "@/organizations/OrgLoading.vue";
	import { isUuid } from "@/common.js"
	import { OrganizationDataHandler } from "./OrganizationDataHandler.js";

	export default {
		data() {
			return {
				isLoading: true,
				list: []
			};
		},
		props: {
			corpId: {
				default: "",
			},
			orgUri: String,
			orgDesc: String,
			orgName: String,
			isSplitOne: Boolean,
			isSplitTwo: Boolean,
			isSplitThree: Boolean,
		},
		components: {
			OrgLoading,
		},
		watch: {
			corpId: async function () {
				if (isUuid(this.corpId)) {
					this.list = await OrganizationDataHandler.getList(this.corpId, this.orgUri);
					this.isLoading = false;
				}
			},
		},
		methods: {
			moveList: function (e) {
				this.$router.push({ name: this.orgName + "List" });
			}
		},
		components: { OrgLoading }
	};
</script>
