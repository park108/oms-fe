<template>
	<div class="div div--detail-listitem" role="listitem" v-show="!this.hidden">
		<span class="span span--detail-attributename">{{ this.attributeName }}</span>
		<select
			class="select select--detail-attribute"
			:name="this.name"
			:id="this.name"
			:disabled="!this.editable"
		>
			<option
				v-for="item in optionList"
				:key="item.id"
				:value="item[name]"
				:selected="item[name] === selectedValue"
			>
				{{ item[name] }} - {{ item[name + 'Desc'] }}
			</option>
		</select>
	</div>
</template>
<script>
	export default {
		props: {
			name: '',
			attributeName: '',
			optionList: Array,
			selectedValue: '',
			editable: false,
			hidden: false,
		}
	}
</script>