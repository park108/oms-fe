<template>
    <div>
        <h1>Divisions</h1>
        <hr />
		<div v-if="isLoading">
			Loading ...
		</div>
        <div class="div--org-listitem" v-else v-for="div in list" :key="div.division">
            <span class="span--button" @click="moveDetail" :value="div.division">{{ div.division }}</span>
            <span> : </span>
            <span>{{ div.divisionDesc }}</span>
        </div>
    </div>
</template>

<script src="./Division.js"></script>
