<template>
	<section class="section section--split-three section--dashboard-linktodetail" @click="moveList">
		<div class="div div--dashboard-item">
			<h1 class="h1">Sales Orgs</h1>
			<hr class="hr" />
			<div class="div div--org-loading" v-if="isLoading">
				Loading ...
			</div>
			<div class="div div--org-listitem" v-else v-for="org in list" :key="org.salesOrg">
				<span class="span">{{ org.salesOrg }}</span>
				<span class="span"> : </span>
				<span class="span">{{ org.salesOrgDesc }}</span>
			</div>
		</div>
	</section>
</template>

<script src="./SalesOrgDashboardItem.js"></script>
