<template>
    <div>
        <h1>Sales Groups</h1>
        <hr />
		<div v-if="isLoading">
			Loading ...
		</div>
        <div class="div--org-listitem" v-else v-for="group in list" :key="group.id">
            <span class="span--button" @click="moveDetail" :value="group.salesGroup">{{ group.salesGroup }}</span>
            <span> : </span>
            <span>{{ group.salesGroupDesc }}</span>
        </div>
    </div>
</template>

<script src="./SalesGroup.js"></script>
