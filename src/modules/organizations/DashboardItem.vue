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
			<h1 class="h1">{{ orgDesc }}</h1>
			<hr class="hr" />
			<OrgLoading v-if="isLoading" />
			<div class="div div--detail-listitem" v-else v-for="item in list" :key="item.code">
				<span class="span">{{ item.code }}</span>
				<span class="span"> - </span>
				<span class="span">{{ item.desc }}</span>
			</div>
		</div>
	</section>
</template>
<script>
	import OrgLoading from "@/modules/organizations/OrgLoading.vue";

	export default {
		props: {
			corpId: {
				default: "",
			},
			isLoading: Boolean,
			list: {
				default: [],
			},
			orgDesc: String,
			orgName: String,
			isSplitOne: Boolean,
			isSplitTwo: Boolean,
			isSplitThree: Boolean,
		},
		components: {
			OrgLoading,
		},
		methods: {
			moveList: function (e) {
				this.$router.push({ name: this.orgName + "List" });
			}
		},
		components: { OrgLoading }
	};
</script>
