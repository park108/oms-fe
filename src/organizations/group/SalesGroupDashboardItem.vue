<template>
	<section class="section section--split-two section--dashboard-linktodetail" @click="moveList">
		<div class="div div--dashboard-item">
			<h1 class="h1">Sales Groups</h1>
			<hr class="hr" />
			<div class="div div--org-loading" v-if="isLoading">
				Loading ...
			</div>
			<div class="div div--org-listitem" v-else v-for="group in list" :key="group.id">
				<span class="span">{{ group.salesGroup }}</span>
				<span class="span"> : </span>
				<span class="span">{{ group.salesGroupDesc }}</span>
			</div>
		</div>
	</section>
</template>

<script src="./SalesGroupDashboardItem.js"></script>
