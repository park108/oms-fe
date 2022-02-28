<template>
    <div>
        <h1>Your Corporation</h1>
        <hr />
		<div v-if="isLoading">
			Loading ...
		</div>
		<div v-else>
			<span>{{ corp.companyName }}</span>
			<span>, {{ corp.countryCode }}</span>
			<span>, {{ corp.vatNumber }}</span>
		</div>
    </div>
</template>

<script src="./Corporation.js"></script>
