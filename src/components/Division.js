import { getApi, isUuid, log } from "../common.js"

const orgUri = "divs";

export default {
	data() {
		return {
			isLoading: true,
			list: []
		}
	},
	props: {
		corpId: ''
	},
	mounted() {
	},
	watch: {
		corpId: function() {

			if(isUuid(this.corpId)) {
				log(orgUri + ".CORPID = " + this.corpId);
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

				if(404 === res.status) {
					log(orgUri + " is not found");
					this.list = dummyData;
				}
				else {
					const data = await res.json();
					this.list = data;
				}
			}
			catch (err) {
				console.error(err);	
			}
			finally {
				log(orgUri + ".finally...");
				this.isLoading = false;
			}
		}
	},
};
				
const dummyData = [
	{
		corp: {
			companyName: "SK on co., ltd.",
			companyCode: "S000",
			companyCodeDesc: "SK on",
			countryCode: "KR",
			vatNumber: "2428702258",
			id: "287263ec-21d7-4bf3-93e2-4b59bd977fdb",
		},
		division: "51",
		divisionDesc: "Battery",
		id: "780d5915-980c-4360-a82e-460d3ea12fa4",
	},
	{
		corp: {
			companyName: "SK on co., ltd.",
			companyCode: "S000",
			companyCodeDesc: "SK on",
			countryCode: "KR",
			vatNumber: "2428702258",
			id: "287263ec-21d7-4bf3-93e2-4b59bd977fdb",
		},
		division: "61",
		divisionDesc: "Material",
		id: "9a7f258e-434c-463d-9f20-2a5a5b259116",
	},
]