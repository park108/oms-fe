<template>
	<select
		class="select select--detail-attribute"
		:name="this.name"
		:id="this.name"
		:disabled="this.disabled"
	>
		<option
			v-for="item in channelList"
			:key="item.id"
			:value="item.distributionChannel"
			:selected="item.distributionChannel === selectedValue"
		>
			{{ item.distributionChannel }} - {{ item.distributionChannelDesc }}
		</option>
	</select>
</template>
<script>
	import { OrganizationDataHandler } from './OrganizationDataHandler';

	export default {
		data() {
			return {
				channelList: [],
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
			this.channelList = await OrganizationDataHandler.getList(this.corpId, "channels");
			if(null === this.channelList) {
				popToast("WARNING", "Sales Org. not found.", this.$store);
			}
		},
	}
</script>