<template>
	<div class="div div--dashboard-item">
        <h1 class="h1">Distribution Channels</h1>
        <hr class="hr" />
		<div class="div div--org-loading" v-if="isLoading">
			Loading ...
		</div>
        <div class="div div--org-listitem" v-else v-for="channel in list" :key="channel.distributionChannel">
            <span class="span span--button-detail" @click="moveDetail" :value="channel.distributionChannel">{{ channel.distributionChannel }}</span>
            <span> : </span>
            <span>{{ channel.distributionChannelDesc }}</span>
        </div>
    </div>
</template>

<script src="./DistributionChannel.js"></script>
