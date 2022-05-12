<template>
	<section class="section section--dashboard-linktodetail"
		:class="{
			'section--split-one': isSplitOne,
			'section--split-two': isSplitTwo,
			'section--split-three': isSplitThree,
		}"
	>
		<div class="div div--dashboard-item">
			<h1 class="h1 h1--dashboard-skeleton">&nbsp;</h1>
			<hr class="hr" />
			<OrgLoading />
		</div>
	</section>
</template>
<script>
	import OrgLoading from "@/organizations/OrgLoading.vue";

	export default {
		props: {
			isSplitOne: Boolean,
			isSplitTwo: Boolean,
			isSplitThree: Boolean,
		},
		components: {
			OrgLoading,
		}
	};
</script>
