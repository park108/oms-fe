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
			:value="item.code"
			:selected="item.code === selectedValue"
		>
			{{ item.code }} - {{ item.description }}
		</option>
	</select>
</template>
<script>
	import { CommonCodes } from './CommonCodes.js';

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
			this.list = await CommonCodes.getCodeList(this.corpId, this.apiUri);
			this.isLoading = false;
		},
	}
</script>