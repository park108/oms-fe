<template>
	<select
		class="select select--detail-attribute"
		:name="this.name"
		:id="this.name"
		:disabled="this.disabled"
	>
		<option
			v-for="item in orgList"
			:key="item.id"
			:value="item.salesOrg"
			:selected="item.salesOrg === selectedValue"
		>
			{{ item.salesOrg }} - {{ item.salesOrgDesc }}
		</option>
	</select>
</template>
<script>
	import { OrganizationDataHandler } from './OrganizationDataHandler';

	export default {
		data() {
			return {
				orgList: [],
			}
		},
		props: {
			name: String,
			corpId: String,
			disabled: {
				type: Boolean,
				default: true,
			},
			selectedValue: {
				type: String,
				default: "",
			}
		},
		async mounted() {
			this.orgList = await OrganizationDataHandler.getList(this.corpId, "orgs");
			if(null === this.orgList) {
				popToast("WARNING", "Sales Org. not found.", this.$store);
			}
		},
	}
</script>