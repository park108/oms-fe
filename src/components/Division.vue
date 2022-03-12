<template>
	<div class="div div--dashboard-item">
        <h1 class="h1">Divisions</h1>
        <hr class="hr" />
		<div class="div div--org-loading" v-if="isLoading">
			Loading ...
		</div>
        <div class="div div--org-listitem" v-else v-for="div in list" :key="div.division">
            <span class="span span--button-detail" @click="moveDetail" :value="div.division">{{ div.division }}</span>
            <span> : </span>
            <span>{{ div.divisionDesc }}</span>
        </div>
    </div>
</template>

<script src="./Division.js"></script>
