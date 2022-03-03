import { getApi, isUuid } from "../common.js"

const orgUri = "channels";

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
						distributionChannel: "20",
						distributionChannelDesc: "Domestic",
						id: "d9e0125f-e0bb-47aa-953d-aa9075a554d1",
					},
					{
						distributionChannel: "40",
						distributionChannelDesc: "Export",
						id: "809b30d1-6ab2-4192-a93f-590a2a7e24ae",
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