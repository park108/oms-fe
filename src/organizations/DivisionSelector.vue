<template>
	<select
		class="select select--detail-attribute"
		:name="this.name"
		:id="this.name"
		:disabled="this.disabled"
	>
		<option
			v-for="item in divisionList"
			:key="item.id"
			:value="item.division"
			:selected="item.division === selectedValue"
		>
			{{ item.division }} - {{ item.divisionDesc }}
		</option>
	</select>
</template>
<script>
	import { OrganizationDataHandler } from './OrganizationDataHandler';

	export default {
		data() {
			return {
				divisionList: [],
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
			this.divisionList = await OrganizationDataHandler.getList(this.corpId, "divs");
			if(null === this.channelList) {
				popToast("WARNING", "Sales Org. not found.", this.$store);
			}
		},
	}
</script>