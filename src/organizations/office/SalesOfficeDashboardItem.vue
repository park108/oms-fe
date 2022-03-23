<template>
	<section class="section section--split-two section--dashboard-linktodetail" @click="moveDetail">
		<div class="div div--dashboard-item">
			<h1 class="h1">Sales Offices</h1>
			<hr class="hr" />
			<div class="div div--org-loading" v-if="isLoading">
				Loading ...
			</div>
			<div class="div div--org-listitem" v-else v-for="office in list" :key="office.id">
				<span class="span">{{ office.salesOffice }}</span>
				<span class="span"> : </span>
				<span class="span">{{ office.salesOfficeDesc }}</span>
			</div>
		</div>
	</section>
</template>

<script src="./SalesOfficeDashboardItem.js"></script>
