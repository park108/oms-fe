<template>
    <div class="div div--dashboard-item">
        <h1 class="h1">{{ corp.companyName }}</h1>
        <hr class="hr" />
		<OrgLoading v-if="isLoading" />
		<div class="div" role="list">
			<div class="div div--org-listitem" role="listitem" >
				<span class="span span--org-listitem">VAT Number: {{ corp.vatNumber }}</span>
			</div>
			<div class="div div--org-listitem" role="listitem" >
				<span class="span span--org-listitem">Country: {{ corp.countryCode }}</span>
			</div>
		</div>
    </div>
</template>

<script>
	import OrgLoading from "@/organizations/OrgLoading.vue";
	import { getApi, log, getGames } from "../../common.js"

	export default {
		data() {
			return {
				isLoading: true,
				corp: {}
			}
		},
		components: {
			OrgLoading,
		},
		mounted() {
			this.getCorprations();
		},
		methods: {
			getCorprations: async function () {

				getGames(10);

				// TODO: Remove dummyUser after make User app.
				const url = getApi("organization") + "/corps/" + dummyUser.corpId;

				try {
					this.isLoading = true;

					const res = await fetch(url);

					if(404 === res.status) {
						log("corps is not found");
						this.corp = dummyData; // TODO: Remove
					}
					else {
						const data = await res.json();
						this.corp = data;
					}
				}
				catch (err) {
					console.error(err);
					this.corp = dummyData; // TODO: Remove
				}
				finally {
					this.$emit("setCorpId", this.corp.id);
					this.$store.state.corp = this.corp;
					this.isLoading = false;
				}
			},
		},
	};

	const dummyData = {
		companyName: "SK On Co., Ltd.",
		companyCode: "S000",
		companyCodeDesc: "SK on",
		countryCode: "KR",
		vatNumber: "2428702258",
		id: "1eb2035d-bb9a-4933-a0ec-438baf8cff0a",
	}

	const dummyUser = {
		name: "Jongkil Park",
		corpId: "1eb2035d-bb9a-4933-a0ec-438baf8cff0a",
		id: "9fh39gg1-bb9a-4933-a0ec-438baf8cff0a"
	}
</script>
