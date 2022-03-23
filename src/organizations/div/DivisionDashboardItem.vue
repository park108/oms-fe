<template>
	<section class="section section--split-three section--dashboard-linktodetail" @click="moveDetail">
		<div class="div div--dashboard-item">
			<h1 class="h1">Divisions</h1>
			<hr class="hr" />
			<div class="div div--org-loading" v-if="isLoading">
				Loading ...
			</div>
			<div class="div div--org-listitem" v-else v-for="div in list" :key="div.division">
				<span class="span">{{ div.division }}</span>
				<span class="span"> : </span>
				<span class="span">{{ div.divisionDesc }}</span>
			</div>
		</div>
	</section>
</template>

<script src="./DivisionDashboardItem.js"></script>
