<template>
	<section class="section section--split-one section--dashboard-linktodetail" @click="moveList">
		<div class="div div--dashboard-item">
			<h1 class="h1">Sales Areas</h1>
			<hr class="hr" />
			<OrgLoading v-if="isLoading" />
			<div class="div div--org-listitem" v-else v-for="area in list" :key="area.id">
				<span class="span">
					{{ area.salesOrg.salesOrg }}/{{ area.distributionChannel.distributionChannel }}/{{ area.division.division }}
				</span>
				<span class="span">-</span>
				<span class="span">{{ area.salesOrg.salesOrgDesc }}, </span>
				<span
					>{{ area.distributionChannel.distributionChannelDesc }},
				</span>
				<span class="span">{{ area.division.divisionDesc }} </span>
			</div>
		</div>
	</section>
</template>

<script>
	import OrgLoading from "@/organizations/OrgLoading.vue";
	import { isUuid } from "@/common.js"
	import { OrganizationDataHandler } from "../OrganizationDataHandler.js";

	export default {
		data() {
			return {
				isLoading: true,
				list: []
			}
		},
		props: {
			corpId: '',
			orgUri: '',
		},
		components: {
			OrgLoading,
		},
		watch: {
			corpId: async function() {
				if(isUuid(this.corpId)) {
					this.list = await OrganizationDataHandler.getList(this.corpId, this.orgUri);
					this.isLoading = false;
				}
			},
		},
		methods: {
			moveList: function(e) {
				const routeTo = "/" + this.orgUri + "/";
				this.$router.push(routeTo);
			}
		},
	};
</script>
