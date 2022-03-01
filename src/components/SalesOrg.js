import { getApi, regexExpForUuid } from "../common.js"

export default {
	data() {
		return {
			isLoading: true,
			orgs: []
		}
	},
	props: {
		corpId: String
	},
	mounted() {
	},
	watch: {
		corpId: function() {

			if(regexExpForUuid.test(this.corpId)) {
				console.log("ORG.CORPID = " + this.corpId);
				this.getSalesOrgs();
			}
		}
	},
	methods: {
		getSalesOrgs: async function() {

			const url = getApi("organization") + "/corps/" + this.corpId + "/orgs/";

			try {
				this.isLoading = true;

				const res = await fetch(url);
				const data = await res.json();

				this.orgs = data;
			}
			catch (err) {
				console.error(err);	
				
				// Dummy Data for Test
				this.orgs = [
					{
						salesOrg: "S000",
						salesOrgDesc: "Battery District",
						id: "57738ddb-cdbb-4901-b8d4-49897142e8ab",
					},
					{
						salesOrg: "S100",
						salesOrgDesc: "Material District",
						id: "15e70991-b766-4538-99da-cb7f4f4dd42c",
					},
				]
			}
			finally {
				console.log("ORG.finally...")
				this.isLoading = false;
			}
		}
	},
};