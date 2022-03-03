import { getApi, isUuid } from "../common.js"

const orgUri = "orgs";

export default {
	data() {
		return {
			isLoading: true,
			list: []
		}
	},
	props: {
		corpId: String
	},
	mounted() {
	},
	watch: {
		corpId: function() {

			if(isUuid(this.corpId)) {
				console.log(orgUri + ".CORPID = " + this.corpId);
				this.getList();
			}
		}
	},
	methods: {
		getList: async function() {

			const url = getApi("organization") + "/corps/" + this.corpId + "/" + orgUri + "/";

			try {
				this.isLoading = true;

				const res = await fetch(url);
				const data = await res.json();

				this.list = data;
			}
			catch (err) {
				console.error(err);	
				
				// Dummy Data for Test
				this.list = [
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
				console.log(orgUri + ".finally...");
				this.isLoading = false;
			}
		}
	},
};