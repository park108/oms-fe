<template>
	<section class="section section--split-three section--dashboard-linktodetail" @click="moveList">
		<div class="div div--dashboard-item">
			<h1 class="h1" @click="moveList">Distribution Channels</h1>
			<hr class="hr" />
			<div class="div div--org-loading" v-if="isLoading">
				Loading ...
			</div>
			<div class="div div--org-listitem" v-else v-for="channel in list" :key="channel.distributionChannel">
				<span class="span">{{ channel.distributionChannel }}</span>
				<span class="span"> : </span>
				<span class="span">{{ channel.distributionChannelDesc }}</span>
			</div>
		</div>
	</section>
</template>

<script src="./DistributionChannelDashboardItem.js"></script>
