import { getApi } from "../common.js"

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

			const url = getApi("organization") + "/corps/";

			try {
				this.isLoading = true;

				const res = await fetch(url);
				const data = await res.json();

				this.corp = data[0];
				this.$emit("setCorpId", this.corp.id);
			}
			catch (err) {
				console.error(err);

				// Dummy Data for Test
				this.corp = {
					companyName: "SK On Co., Ltd.",
					companyCode: "S000",
					companyCodeDesc: "SK on",
					countryCode: "KR",
					vatNumber: "2428702258",
					id: "287263ec-21d7-4bf3-93e2-4b59bd977fdb",
				}
			}
			finally {
				console.log("CORP.finally...")
				this.isLoading = false;
			}
		},
	},
};