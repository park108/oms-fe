<template>
    <div class="div div--dashboard-item">
        <h1 class="h1">Your Corporation</h1>
        <hr class="hr" />
		<div class="div div--org-loading" v-if="isLoading">
			Loading ...
		</div>
		<div class="div div--org-listitem" v-else>
			<span class="span span--org-listitem">{{ corp.companyName }}</span>
			<span class="span span--org-listitem">, {{ corp.countryCode }}</span>
			<span class="span span--org-listitem">, {{ corp.vatNumber }}</span>
		</div>
    </div>
</template>

<script>
	import { getApi, log, getGames } from "../../common.js"

	export default {
		data() {
			return {
				isLoading: true,
				corp: {}
			}
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
						log(orgUri + " is not found");
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
					log("CORP.finally...")
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
