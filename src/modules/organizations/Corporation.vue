<template>
    <div class="div div--dashboard-item">
		<h1 class="h1 h1--dashboard-skeleton" v-if="isLoading">&nbsp;</h1>
        <h1 class="h1" v-else>{{ corp.companyName }}</h1>
        <hr class="hr" />
		<OrgLoading v-if="isLoading" />
		<div class="div" role="list" v-else>
			<div class="div div--detail-listitem" role="listitem" >
				<span class="span span--org-listitem">{{ corp.address }}</span>
			</div>
			<div class="div div--detail-listitem" role="listitem" >
				<span class="span span--org-listitem">{{ corp.vatNumber }}</span>
			</div>
		</div>
    </div>
</template>

<script>
	import OrgLoading from "@/modules/organizations/OrgLoading.vue";
	import { UserDataHandler } from '@/modules/users/UserDataHandler.js';
	import { getApi, sleep, log } from "../common/common.js"

	export default {
		data() {
			return {
				isLoading: true,
				userInfo: null,
				corp: {}
			}
		},
		components: {
			OrgLoading,
		},
		created() {
			this.userInfo = UserDataHandler.getUserInfo();
			if(null === this.userInfo) {
				this.$router.push({name: "login"});
				return;
			}
		},
		mounted() {
			this.getCorprations();
		},
		methods: {
			getCorprations: async function () {
				const url = getApi("organization") + "/corps/" + this.userInfo.corpId;
				try {
					this.isLoading = true;
					const res = await fetch(url);
					if(404 === res.status) {
						log("INFO", "corps is not found");
						// TODO: Make test latency
						await sleep(100 + 100 * Math.random());
						this.corp = dummyData; // TODO: Remove
					}
					else {
						const data = await res.json();
						this.corp = data;
						log("INFO", data);
					}
				}
				catch (err) {
					log("ERROR", err);
					this.corp = dummyData; // TODO: Remove
				}
				finally {
					sessionStorage.setItem("corp", JSON.stringify(this.corp));
					this.isLoading = false;
				}
			},
		},
	};

	const dummyData = {
		companyName: "SK On Co., Ltd.",
		companyCode: "S000",
		companyCodeDesc: "SK on",
		vatNumber: "2428702258",
		country: "KR",
		address: "26, Jong-ro, Jongno-gu, Seoul, Korea",
		"id": "4d5b98f3-caf0-4785-b60a-207b85d01c5d",
	}
</script>