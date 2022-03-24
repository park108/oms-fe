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

			const url = getApi("organization") + "/corps/";

			try {
				this.isLoading = true;

				const res = await fetch(url);

				if(404 === res.status) {
					log(orgUri + " is not found");
					this.corp = dummyData;
					this.$emit("setCorpId", this.corp.id);
				}
				else {
					const data = await res.json();
					this.corp = data[0];
					this.$emit("setCorpId", this.corp.id);
				}
			}
			catch (err) {
				console.error(err);
			}
			finally {
				log("CORP.finally...")
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
	id: "287263ec-21d7-4bf3-93e2-4b59bd977fdb",
}