<template>
	<span v-if="isLoading" class="span span--input-skeleton">&nbsp;</span>
	<select
		v-else
		class="select select--detail-attribute"
		:name="this.name"
		:id="this.name"
		:disabled="this.disabled"
	>
		<option
			v-for="item in list"
			:key="item.id"
			:value="item[name]"
			:selected="item[name] === selectedValue"
		>
			{{ item[name] }} - {{ item[name + "Desc"] }}
		</option>
	</select>
</template>
<script>
	import { OrganizationDataHandler } from './OrganizationDataHandler';

	export default {
		data() {
			return {
				isLoading: true,
				list: [],
			}
		},
		props: {
			name: String,
			apiUri: String,
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
			this.list = await OrganizationDataHandler.getList(this.corpId, this.apiUri);
			if(null === this.list) {
				popToast("WARNING", "Sales Org. not found.", this.$store);
			}
			this.isLoading = false;
		},
	}
</script>