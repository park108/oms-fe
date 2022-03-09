<template>
    <div>
        <h1>Distribution Channels</h1>
        <hr />
		<div v-if="isLoading">
			Loading ...
		</div>
        <div class="div--org-listitem" v-else v-for="channel in list" :key="channel.distributionChannel">
            <span class="span--button" @click="moveDetail" :value="channel.distributionChannel">{{ channel.distributionChannel }}</span>
            <span> : </span>
            <span>{{ channel.distributionChannelDesc }}</span>
        </div>
    </div>
</template>

<script src="./DistributionChannel.js"></script>
