<template>
    <div>
        <h1>Distribution Channels</h1>
        <hr />
        <div v-for="channel in channels" :key="channel.distributionChannel">
            <span>{{ channel.distributionChannel }}</span>
            <span> : </span>
            <span>{{ channel.distributionChannelDesc }}</span>
        </div>
    </div>
</template>

<script src="./DistributionChannel.js"></script>
